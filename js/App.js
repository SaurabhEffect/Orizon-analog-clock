// ORIZON Clock App v3.2 - Main Application

class ClockApp {
  constructor() {
    this.eventEmitter = new EventEmitter();
    this.storageManager = new StorageManager("orizon");
    this.audioManager = new AudioManager(this.eventEmitter);
    this.components = {};
    this.state = {
      currentTheme: "dark",
      timezone: "local",
      digitalVisible: false,
      isFullscreen: false,
      powerSaver: false,
      showSeconds: true,
      reducedMotion: false,
    };

    this.clockUpdateInterval = null;
    this.dateUpdateInterval = null;
    this.animationFrameId = null;
    this.autoThemeInterval = null;
    this.autoThemeEnabled = false;
    this.openPanels = {
      themePanel: false,
      settingsPanel: false,
      timezonePanel: false,
    };
  }

  async init() {
    console.log("🚀 Initializing ORIZON Clock App v3.2");
    this.loadPreferences();
    this.initializeComponents();
    this.setupGlobalEventListeners();
    this.startTimeUpdates();
    this.applyTheme(this.state.currentTheme);
    setTimeout(() => {
      this.eventEmitter.emit("themeApplied", this.state.currentTheme);
    }, 200);
    if (this.state.autoTheme) {
      console.log("AutoTheme enabled on load. Applying...");
      this.applyAutoTheme();
      this.startAutoThemeInterval();
    }
    this.setupKeyboardShortcuts();
    this.enableWakeLock();
    this.initCursorAutoHide();
    console.log("✅ ORIZON Clock App initialized successfully");
  }

  initializeComponents() {
    const clockContainer =
      document.querySelector(".clock") || document.createElement("div");
    const digitalContainer =
      document.getElementById("digitalDisplay") ||
      document.createElement("div");
    const dateContainer =
      document.querySelector(".date-wrapper") || document.createElement("div");
    const controlContainer =
      document.querySelector(".sidebar-area") || document.createElement("div");
    const themeContainer =
      document.getElementById("themePanel") || document.createElement("div");
    const settingsContainer =
      document.getElementById("settingsPanel") || document.createElement("div");
    const timezoneContainer =
      document.getElementById("timezonePanel") || document.createElement("div");

    this.components.clock = new ClockComponent(
      clockContainer,
      this.eventEmitter
    );
    this.components.digitalDisplay = new DigitalDisplayComponent(
      digitalContainer,
      this.eventEmitter
    );
    this.components.dateDisplay = new DateDisplayComponent(
      dateContainer,
      this.eventEmitter
    );
    this.components.controlPanel = new ControlPanelComponent(
      controlContainer,
      this.eventEmitter
    );
    this.components.themePanel = new ThemePanelComponent(
      themeContainer,
      this.eventEmitter
    );
    this.components.settingsPanel = new SettingsPanelComponent(
      settingsContainer,
      this.eventEmitter
    );
    this.components.timezonePanel = new TimezonePanelComponent(
      timezoneContainer,
      this.eventEmitter
    );
  }

  setupGlobalEventListeners() {
    this.eventEmitter.on("toggleDigitalDisplay", () =>
      this.toggleDigitalDisplay()
    );
    this.eventEmitter.on("toggleTimezonePanel", () =>
      this.togglePanel("timezonePanel")
    );
    this.eventEmitter.on("toggleSettingsPanel", () =>
      this.togglePanel("settingsPanel")
    );
    this.eventEmitter.on("toggleThemePanel", () => {
      console.log("🎨 Theme panel toggle requested");
      this.togglePanel("themePanel");
    });
    this.eventEmitter.on("toggleSound", () => this.toggleSound());
    this.eventEmitter.on("toggleFullscreen", () => this.toggleFullscreen());
    this.eventEmitter.on("themeChanged", (theme) => {
      console.log("App received theme change request:", theme);
      this.changeTheme(theme, false);
    });
    this.eventEmitter.on("timezoneChanged", (timezone) =>
      this.changeTimezone(timezone)
    );
    this.eventEmitter.on("settingChanged", (setting, value) =>
      this.handleSettingChange(setting, value)
    );
    this.eventEmitter.on("volumeChanged", (volume) => {
      this.audioManager.setVolume(volume);
    });
    this.eventEmitter.on("isChimeEnabled", (enabled) => {
      this.audioManager.setChimeEnabled(enabled);
    });
    this.eventEmitter.on("isTickEnabled", (enabled) => {
      this.audioManager.setTickEnabled(enabled);
    });
    document.addEventListener("fullscreenchange", () =>
      this.handleFullscreenChange()
    );
    document.addEventListener("visibilitychange", () =>
      this.handleVisibilityChange()
    );
    document.addEventListener("click", (e) => this.handleOutsideClick(e));
    window.addEventListener("beforeunload", () => this.destroy());
  }

  setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }
      const shortcuts = {
        d: () => this.toggleDigitalDisplay(),
        t: () => this.togglePanel("themePanel"),
        s: () => this.togglePanel("settingsPanel"),
        z: () => this.togglePanel("timezonePanel"),
        f: () => this.toggleFullscreen(),
        a: () => this.toggleSound(),
        m: () => this.components.controlPanel?.toggleSidebar(),
        q: () => this.quickThemeToggle(),
        Escape: () => this.closeAllPanels(),
      };
      if (shortcuts[e.key.toLowerCase()]) {
        e.preventDefault();
        shortcuts[e.key.toLowerCase()]();
      }
    });
  }

  startTimeUpdates() {
    let lastSecond = -1;
    let lastMinute = -1;
    const update = () => {
      const currentTime = TimeUtils.getCurrentTime(this.state.timezone);
      const currentSecond = currentTime.getSeconds();
      const currentMinute = currentTime.getMinutes();
      this.eventEmitter.emit("timeUpdate", currentTime, this.state.timezone);
      if (currentSecond !== lastSecond) {
        this.audioManager.handleTimeUpdate(currentTime);
        lastSecond = currentSecond;
      }
      if (currentMinute !== lastMinute) {
        this.eventEmitter.emit("dateUpdate", currentTime, this.state.timezone);
        lastMinute = currentMinute;
      }
      if (!this.state.powerSaver) {
        this.animationFrameId = requestAnimationFrame(update);
      } else {
        setTimeout(() => {
          this.animationFrameId = requestAnimationFrame(update);
        }, 1000);
      }
    };
    update();
    const currentTime = TimeUtils.getCurrentTime(this.state.timezone);
    this.eventEmitter.emit("dateUpdate", currentTime, this.state.timezone);
  }

  toggleDigitalDisplay() {
    this.state.digitalVisible = !this.state.digitalVisible;
    this.eventEmitter.emit("digitalToggled", this.state.digitalVisible);
    this.savePreferences();
  }

  togglePanel(panelName) {
    console.log(`🔄 Toggle request for: ${panelName}`);
    const isCurrentlyOpen = this.openPanels[panelName];

    if (isCurrentlyOpen) {
      console.log(`❌ Closing ${panelName} (was already open)`);
      this.openPanels[panelName] = false;
      this.eventEmitter.emit(`${panelName}Toggle`);
    } else {
      console.log(`📤 Closing all other panels`);
      this.eventEmitter.emit("closeAllPanels");
      Object.keys(this.openPanels).forEach((key) => {
        this.openPanels[key] = false;
      });
      console.log(`✅ Opening ${panelName}`);
      this.openPanels[panelName] = true;
      this.eventEmitter.emit(`${panelName}Toggle`);
    }
  }

  closeAllPanels() {
    console.log("🚪 Closing all panels");
    Object.keys(this.openPanels).forEach((key) => {
      this.openPanels[key] = false;
    });
    this.eventEmitter.emit("closeAllPanels");
  }

  handleOutsideClick(event) {
    const clickedElement = event.target;
    const isClickInsidePanel = clickedElement.closest(".left-panel-container");
    const isClickInsideSidebar = clickedElement.closest(".sidebar-area");
    const isClickInThemePanel = clickedElement.closest("#themePanel");
    const isClickInSettingsPanel = clickedElement.closest("#settingsPanel");
    const isClickInTimezonePanel = clickedElement.closest("#timezonePanel");
    if (
      !isClickInsidePanel &&
      !isClickInsideSidebar &&
      !isClickInThemePanel &&
      !isClickInSettingsPanel &&
      !isClickInTimezonePanel
    ) {
      console.log("🖱️ Outside click detected - closing all panels");
      this.closeAllPanels();
    }
  }

  async toggleSound() {
    const isEnabled = await this.audioManager.toggleAudio();
    this.savePreferences();
  }

  async toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  }

  handleFullscreenChange() {
    this.state.isFullscreen = !!document.fullscreenElement;
    document.body.classList.toggle("is-fullscreen", this.state.isFullscreen);
    this.eventEmitter.emit("fullscreenChanged", this.state.isFullscreen);
    this.components.clock?.handleFullscreenChange(this.state.isFullscreen);
  }

  handleVisibilityChange() {
    if (document.hidden) {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
    } else {
      this.startTimeUpdates();
    }
  }

  changeTheme(themeName, isAutomatic = false) {
    if (this.state.currentTheme === themeName) {
      console.log("Theme is already", themeName, "- skipping change");
      return;
    }
    if (this.state.autoTheme && !isAutomatic) {
      console.log("Manual theme change detected. Disabling auto-theme.");
      this.state.autoTheme = false;
      this.stopAutoThemeInterval();
      this.eventEmitter.emit("updateSettingUI", "autoTheme", false);
    }
    this.state.currentTheme = themeName;
    this.applyTheme(themeName);
    this.savePreferences();
    this.eventEmitter.emit("themeApplied", themeName);
  }

  applyTheme(themeName) {
    console.log(`🎨 Applying theme: ${themeName}`);
    if (themeName !== "custom") {
      const customVars = [
        "--bg-primary-start",
        "--bg-primary-end",
        "--text-primary",
        "--text-secondary",
        "--accent-color",
        "--accent-secondary",
        "--bg-glass-color",
        "--glass-opacity",
        "--hour-hand-color",
        "--minute-hand-color",
        "--second-hand-color",
        "--center-dot-color",
        "--bg-primary",
      ];
      customVars.forEach((v) =>
        document.documentElement.style.removeProperty(v)
      );
    }
    document.documentElement.setAttribute("data-theme", themeName);
    console.log(`✅ Theme applied successfully: ${themeName}`);
  }

  quickThemeToggle() {
    const themes = ["dark", "light", "midnight", "sunset", "ocean", "forest"];
    const currentIndex = themes.indexOf(this.state.currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    this.eventEmitter.emit("themeChanged", nextTheme);
  }

  applyAutoTheme() {
    if (!this.state.autoTheme) {
      this.stopAutoThemeInterval();
      return;
    }
    console.log("Checking for auto-theme change...");
    const hour = new Date().getHours();
    let autoTheme;
    if (hour >= 6 && hour < 12) {
      autoTheme = "light";
    } else if (hour >= 12 && hour < 18) {
      autoTheme = "sunset";
    } else if (hour >= 18 && hour < 22) {
      autoTheme = "dark";
    } else {
      autoTheme = "midnight";
    }

    if (autoTheme !== this.state.currentTheme) {
      console.log(`Auto-applying theme: ${autoTheme}`);
      this.changeTheme(autoTheme, true);
    }
  }

  startAutoThemeInterval() {
    this.stopAutoThemeInterval();
    this.autoThemeInterval = setInterval(() => {
      this.applyAutoTheme();
    }, 3600000);
    console.log("AutoTheme interval started (checks every hour).");
  }

  stopAutoThemeInterval() {
    if (this.autoThemeInterval) {
      clearInterval(this.autoThemeInterval);
      this.autoThemeInterval = null;
      console.log("AutoTheme interval stopped.");
    }
  }

  changeTimezone(timezone) {
    this.state.timezone = timezone;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.startTimeUpdates();
    this.storageManager.save("timezone", timezone);
    const displayName = TimeUtils.getTimezoneDisplayName(timezone);
    console.log(`🌍 Timezone changed to: ${displayName}`);
  }

  handleSettingChange(setting, value) {
    this.state[setting] = value;
    switch (setting) {
      case "powerSaver":
        if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId);
        }
        this.startTimeUpdates();
        this.eventEmitter.emit("powerSaverChanged", value);
        break;
      case "reducedMotion":
        document.body.classList.toggle("reduced-motion", value);
        break;
      case "showSeconds":
        this.eventEmitter.emit("showSecondsChanged", value);
        break;
      case "autoTheme":
        if (value) {
          console.log("AutoTheme toggled ON");
          this.applyAutoTheme();
          this.startAutoThemeInterval();
        } else {
          console.log("AutoTheme toggled OFF");
          this.stopAutoThemeInterval();
        }
        break;
    }
    this.savePreferences();
  }

  loadPreferences() {
    const preferences = this.storageManager.load("preferences", {});
    this.state = { ...this.state, ...preferences };
    const audioSettings = this.storageManager.load("audio", {});
    this.audioManager.loadSettings(audioSettings);
    const savedTimezone = this.storageManager.load("timezone", "local");
    this.state.timezone = savedTimezone;
    console.log(
      "📚 Preferences loaded, current theme:",
      this.state.currentTheme
    );
  }

  savePreferences() {
    this.storageManager.save("preferences", this.state);
    this.storageManager.save("audio", this.audioManager.getState());
  }

  async enableWakeLock() {
    try {
      if ("wakeLock" in navigator) {
        this.wakeLock = await navigator.wakeLock.request("screen");
        console.log("🔒 Wake Lock enabled: screen will stay on");
        document.addEventListener("visibilitychange", async () => {
          if (document.visibilityState === "visible") {
            this.wakeLock = await navigator.wakeLock.request("screen");
            console.log("🔁 Wake Lock re-enabled after visibility change");
          }
        });
      } else {
        console.warn("⚠️ Wake Lock API not supported in this browser.");
      }
    } catch (err) {
      console.error("❌ Wake Lock request failed:", err);
    }
  }

  initCursorAutoHide() {
    console.log("🖱️ Initializing cursor auto-hide feature...");
    let cursorTimer = null;
    const hideDelay = 2000;
    const hideCursor = () => {
      document.body.style.cursor = "none";
    };
    const showCursor = () => {
      document.body.style.cursor = "default";
      clearTimeout(cursorTimer);
      cursorTimer = setTimeout(hideCursor, hideDelay);
    };
    window.addEventListener("mousemove", showCursor);
    window.addEventListener("keydown", showCursor);
    window.addEventListener("click", showCursor);
    window.addEventListener("touchstart", showCursor);
    showCursor();
    console.log("✅ Cursor auto-hide active!");
  }

  destroy() {
    console.log("🔄 Cleaning up ORIZON Clock App");
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.dateUpdateInterval) {
      clearInterval(this.dateUpdateInterval);
    }
    Object.values(this.components).forEach((component) => {
      if (component && component.destroy) component.destroy();
    });
    this.audioManager.destroy();
    this.eventEmitter.removeAllListeners();
    console.log("✅ ORIZON Clock App cleaned up");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.app = new ClockApp();
  window.app.init();
});
