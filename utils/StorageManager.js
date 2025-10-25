// ORIZON Clock v3.2 - Storage Manager

class StorageManager {
  constructor(keyPrefix = "orizon") {
    this.keyPrefix = keyPrefix;
    this.isAvailable = this.checkAvailability();
    this.quotaExceeded = false;
    this.memoryStorage = {};
    this.stats = {
      reads: 0,
      writes: 0,
      deletes: 0,
      errors: 0,
    };
    if (!this.isAvailable) {
      console.warn("⚠️ localStorage not available. Using memory fallback.");
    }
  }

  checkAvailability() {
    try {
      const testKey = `${this.keyPrefix}-test`;
      localStorage.setItem(testKey, "test");
      localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  getKey(key) {
    return `${this.keyPrefix}-${key}`;
  }

  save(key, data, options = {}) {
    if (!key) {
      console.error("❌ Storage key is required");
      return false;
    }
    try {
      const prefixedKey = this.getKey(key);
      const storageData = {
        value: data,
        timestamp: Date.now(),
      };
      if (options.ttl && typeof options.ttl === "number") {
        storageData.expiresAt = Date.now() + options.ttl;
      }
      const serializedData = JSON.stringify(storageData);
      if (this.isAvailable) {
        localStorage.setItem(prefixedKey, serializedData);
      } else {
        this.memoryStorage[prefixedKey] = serializedData;
      }
      this.stats.writes++;
      this.quotaExceeded = false;
      return true;
    } catch (error) {
      this.stats.errors++;
      if (error.name === "QuotaExceededError") {
        this.quotaExceeded = true;
        console.error("❌ Storage quota exceeded. Consider clearing old data.");
      } else {
        console.warn(`Could not save to storage:`, error);
      }
      return false;
    }
  }

  load(key, defaultValue = null) {
    if (!key) {
      console.error("❌ Storage key is required");
      return defaultValue;
    }

    try {
      const prefixedKey = this.getKey(key);
      let serializedData;
      if (this.isAvailable) {
        serializedData = localStorage.getItem(prefixedKey);
      } else {
        serializedData = this.memoryStorage[prefixedKey];
      }
      if (!serializedData) {
        return defaultValue;
      }
      const storageData = JSON.parse(serializedData);
      if (storageData.expiresAt && Date.now() > storageData.expiresAt) {
        console.log(`⏱️ Storage key "${key}" has expired. Removing...`);
        this.remove(key);
        return defaultValue;
      }
      this.stats.reads++;
      return storageData.value;
    } catch (error) {
      this.stats.errors++;
      console.warn(`Could not load from storage:`, error);
      return defaultValue;
    }
  }

  remove(key) {
    if (!key) {
      console.error("❌ Storage key is required");
      return false;
    }
    try {
      const prefixedKey = this.getKey(key);
      if (this.isAvailable) {
        localStorage.removeItem(prefixedKey);
      } else {
        delete this.memoryStorage[prefixedKey];
      }
      this.stats.deletes++;
      return true;
    } catch (error) {
      this.stats.errors++;
      console.warn(`Could not remove from storage:`, error);
      return false;
    }
  }

  exists(key) {
    if (!key) {
      return false;
    }
    try {
      const data = this.load(key, undefined);
      return data !== undefined;
    } catch (error) {
      return false;
    }
  }

  clear() {
    try {
      let count = 0;
      if (this.isAvailable) {
        const keys = Object.keys(localStorage);
        const prefixedKeys = keys.filter((key) =>
          key.startsWith(`${this.keyPrefix}-`)
        );
        prefixedKeys.forEach((key) => {
          localStorage.removeItem(key);
          count++;
        });
      } else {
        count = Object.keys(this.memoryStorage).length;
        this.memoryStorage = {};
      }
      console.log(`🗑️ Cleared ${count} storage items`);
      return count;
    } catch (error) {
      this.stats.errors++;
      console.warn(`Could not clear storage:`, error);
      return 0;
    }
  }

  keys() {
    try {
      const prefix = `${this.keyPrefix}-`;
      let allKeys;
      if (this.isAvailable) {
        allKeys = Object.keys(localStorage);
      } else {
        allKeys = Object.keys(this.memoryStorage);
      }
      return allKeys
        .filter((key) => key.startsWith(prefix))
        .map((key) => key.substring(prefix.length));
    } catch (error) {
      console.warn("Could not get storage keys:", error);
      return [];
    }
  }

  getSize() {
    try {
      let totalBytes = 0;
      const keys = this.keys();
      keys.forEach((key) => {
        const prefixedKey = this.getKey(key);
        let value;
        if (this.isAvailable) {
          value = localStorage.getItem(prefixedKey);
        } else {
          value = this.memoryStorage[prefixedKey];
        }
        if (value) {
          totalBytes += value.length * 2;
        }
      });
      return {
        bytes: totalBytes,
        kilobytes: (totalBytes / 1024).toFixed(2),
        megabytes: (totalBytes / (1024 * 1024)).toFixed(2),
        keyCount: keys.length,
      };
    } catch (error) {
      console.warn("Could not calculate storage size:", error);
      return { bytes: 0, kilobytes: 0, megabytes: 0, keyCount: 0 };
    }
  }

  saveMany(items) {
    const results = { success: 0, failed: 0 };
    Object.entries(items).forEach(([key, value]) => {
      const saved = this.save(key, value);
      if (saved) {
        results.success++;
      } else {
        results.failed++;
      }
    });
    return results;
  }

  loadMany(keys, defaultValue = null) {
    const results = {};
    keys.forEach((key) => {
      results[key] = this.load(key, defaultValue);
    });
    return results;
  }

  export() {
    const data = {};
    const keys = this.keys();
    keys.forEach((key) => {
      data[key] = this.load(key);
    });

    return {
      version: "1.0",
      timestamp: Date.now(),
      prefix: this.keyPrefix,
      data,
    };
  }

  import(exportedData, overwrite = false) {
    if (!exportedData || !exportedData.data) {
      console.error("❌ Invalid export data");
      return { success: 0, failed: 0, skipped: 0 };
    }
    const results = { success: 0, failed: 0, skipped: 0 };
    Object.entries(exportedData.data).forEach(([key, value]) => {
      if (!overwrite && this.exists(key)) {
        results.skipped++;
        return;
      }
      const saved = this.save(key, value);
      if (saved) {
        results.success++;
      } else {
        results.failed++;
      }
    });
    console.log(`📦 Import complete:`, results);
    return results;
  }

  getStats() {
    const size = this.getSize();
    return {
      ...this.stats,
      storage: size,
      isAvailable: this.isAvailable,
      quotaExceeded: this.quotaExceeded,
      usingMemoryFallback: !this.isAvailable,
    };
  }

  resetStats() {
    this.stats = {
      reads: 0,
      writes: 0,
      deletes: 0,
      errors: 0,
    };
  }

  cleanupExpired() {
    let cleaned = 0;
    const keys = this.keys();
    keys.forEach((key) => {
      const value = this.load(key, undefined);
      if (value === undefined && this.exists(key)) {
        cleaned++;
      }
    });
    if (cleaned > 0) {
      console.log(`🧹 Cleaned up ${cleaned} expired items`);
    }
    return cleaned;
  }
}
