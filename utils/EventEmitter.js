// ORIZON Clock v3.2 - Event Emitter

class EventEmitter {
  constructor(options = {}) {
    this.events = {};
    this.maxListeners = options.maxListeners || 10;
    this.debugMode = options.debug || false;
    this.destroyed = false;
    this.listenerCounts = {};
    if (this.debugMode) {
      console.log("🎯 EventEmitter initialized with debug mode");
    }
  }

  on(event, callback) {
    if (this.destroyed) {
      console.warn("⚠️ Cannot add listener to destroyed EventEmitter");
      return () => {};
    }
    if (typeof event !== "string" || !event) {
      console.error("❌ Event name must be a non-empty string");
      return () => {};
    }
    if (typeof callback !== "function") {
      console.error("❌ Callback must be a function");
      return () => {};
    }
    if (!this.events[event]) {
      this.events[event] = [];
      this.listenerCounts[event] = 0;
    }
    this.listenerCounts[event]++;
    if (this.listenerCounts[event] > this.maxListeners) {
      console.warn(
        `⚠️ Possible memory leak detected: ${this.listenerCounts[event]} listeners for "${event}". ` +
          `Max is ${this.maxListeners}.`
      );
    }
    this.events[event].push(callback);
    if (this.debugMode) {
      console.log(
        `✅ Listener added for "${event}" (total: ${this.events[event].length})`
      );
    }
    return () => {
      if (!this.destroyed) {
        this.off(event, callback);
      }
    };
  }

  once(event, callback) {
    if (typeof callback !== "function") {
      console.error("❌ Callback must be a function");
      return () => {};
    }
    let unsubscribe;
    const onceWrapper = (...args) => {
      if (unsubscribe) {
        unsubscribe();
      }
      callback(...args);
    };
    unsubscribe = this.on(event, onceWrapper);
    return unsubscribe;
  }

  off(event, callback) {
    if (this.destroyed) {
      return;
    }
    if (!this.events[event]) {
      return;
    }
    if (callback) {
      const initialLength = this.events[event].length;
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
      const removed = initialLength - this.events[event].length;
      this.listenerCounts[event] = Math.max(
        0,
        this.listenerCounts[event] - removed
      );
      if (this.debugMode) {
        console.log(`🗑️ Removed ${removed} listener(s) from "${event}"`);
      }
    } else {
      const count = this.events[event].length;
      delete this.events[event];
      delete this.listenerCounts[event];
      if (this.debugMode) {
        console.log(`🗑️ Removed all ${count} listeners from "${event}"`);
      }
    }
    if (this.events[event] && this.events[event].length === 0) {
      delete this.events[event];
      delete this.listenerCounts[event];
    }
  }

  emit(event, ...args) {
    if (this.destroyed) {
      if (this.debugMode) {
        console.warn(`⚠️ Cannot emit "${event}" on destroyed EventEmitter`);
      }
      return false;
    }
    if (!event) {
      console.error("❌ Event name is required");
      return false;
    }
    let hasListeners = false;
    if (this.events[event] && this.events[event].length > 0) {
      hasListeners = true;
      const listeners = [...this.events[event]];
      if (this.debugMode) {
        console.log(
          `📢 Emitting "${event}" to ${listeners.length} listener(s)`
        );
      }
      listeners.forEach((callback, index) => {
        try {
          callback(...args);
        } catch (error) {
          console.error(
            `❌ Error in listener #${index} for "${event}":`,
            error
          );
        }
      });
    }
    if (this.events["*"] && this.events["*"].length > 0) {
      hasListeners = true;
      const wildcardListeners = [...this.events["*"]];
      wildcardListeners.forEach((callback) => {
        try {
          callback(event, ...args);
        } catch (error) {
          console.error(`❌ Error in wildcard listener for "${event}":`, error);
        }
      });
    }
    return hasListeners;
  }

  removeAllListeners(event) {
    if (this.destroyed) {
      return;
    }
    if (event) {
      if (this.events[event]) {
        const count = this.events[event].length;
        delete this.events[event];
        delete this.listenerCounts[event];
        if (this.debugMode) {
          console.log(`🗑️ Removed all ${count} listeners from "${event}"`);
        }
      }
    } else {
      const totalCount = Object.values(this.events).reduce(
        (sum, listeners) => sum + listeners.length,
        0
      );
      this.events = {};
      this.listenerCounts = {};
      if (this.debugMode) {
        console.log(`🗑️ Removed all ${totalCount} listeners`);
      }
    }
  }

  listenerCount(event) {
    return this.events[event] ? this.events[event].length : 0;
  }

  eventNames() {
    return Object.keys(this.events);
  }

  listeners(event) {
    return this.events[event] ? [...this.events[event]] : [];
  }

  hasListeners(event) {
    return Boolean(this.events[event] && this.events[event].length > 0);
  }

  setMaxListeners(n) {
    if (typeof n === "number" && n > 0) {
      this.maxListeners = n;
    }
  }

  getStats() {
    const events = this.eventNames();
    const totalListeners = events.reduce(
      (sum, event) => sum + this.listenerCount(event),
      0
    );
    return {
      eventCount: events.length,
      totalListeners,
      events: events.map((event) => ({
        name: event,
        listenerCount: this.listenerCount(event),
      })),
      destroyed: this.destroyed,
    };
  }

  destroy() {
    if (this.destroyed) {
      return;
    }
    if (this.debugMode) {
      console.log("🗑️ Destroying EventEmitter...", this.getStats());
    }
    this.removeAllListeners();
    this.destroyed = true;
    console.log("✅ EventEmitter destroyed");
  }
}
