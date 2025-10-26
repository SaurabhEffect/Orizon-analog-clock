// SettingsPanel.js - Application settings and preferences

class SettingsPanelComponent {
  constructor(container, eventEmitter) {
    this.container = container;
    this.eventEmitter = eventEmitter;
    this.isVisible = false;
    this.settings = {
      hourlyChime: false,
      tickSound: false,
      showSeconds: true,
      smoothTransitions: true,
      reducedMotion: false,
      powerSaver: false,
      autoTheme: false,
      volume: 0.5,
    };
    this.panel = null;
    this.volumeSlider = null;
    this.volumeValue = null;

    this.init();
    this.setupEventListeners();
  }

  init() {
    this.cacheElements();
    this.loadSettings();
  }

  cacheElements() {
    this.panel = this.container;
    this.volumeSlider = document.getElementById("volumeSlider");
    this.volumeValue = document.getElementById("volumeValue");
    this.eventEmitter.on("updateSettingUI", (setting, value) => {
      console.log(`SettingsPanel received UI update for ${setting}: ${value}`);
      if (setting === "autoTheme") {
        const autoThemeCheckbox = document.getElementById("autoTheme");
        if (autoThemeCheckbox) {
          autoThemeCheckbox.checked = value;
          this.settings.autoTheme = value;
        }
      }
    });
  }

  setupEventListeners() {
    this.eventEmitter.on("settingsPanelToggle", () => this.toggleVisibility());
    this.eventEmitter.on("closeAllPanels", () => this.hide());
  }

  attachEventHandlers() {
    const closeBtn = document.getElementById("closeSettings");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.hide());
    }

    const hourlyChime = document.getElementById("hourlyChime");
    if (hourlyChime) {
      hourlyChime.addEventListener("change", (e) => {
        this.settings.hourlyChime = e.target.checked;
        this.eventEmitter.emit("isChimeEnabled", e.target.checked);
      });
    }

    const tickSound = document.getElementById("tickSound");
    if (tickSound) {
      tickSound.addEventListener("change", (e) => {
        this.settings.tickSound = e.target.checked;
        this.eventEmitter.emit("isTickEnabled", e.target.checked);
      });
    }

    const showSeconds = document.getElementById("showSeconds");
    if (showSeconds) {
      showSeconds.addEventListener("change", (e) => {
        this.settings.showSeconds = e.target.checked;
        this.eventEmitter.emit(
          "settingChanged",
          "showSeconds",
          e.target.checked
        );
      });
    }

    const smoothTransitions = document.getElementById("smoothTransitions");
    if (smoothTransitions) {
      smoothTransitions.addEventListener("change", (e) => {
        this.settings.smoothTransitions = e.target.checked;
        this.eventEmitter.emit(
          "settingChanged",
          "smoothTransitions",
          e.target.checked
        );
      });
    }

    const reducedMotion = document.getElementById("reducedMotion");
    if (reducedMotion) {
      reducedMotion.addEventListener("change", (e) => {
        this.settings.reducedMotion = e.target.checked;
        this.eventEmitter.emit(
          "settingChanged",
          "reducedMotion",
          e.target.checked
        );
      });
    }

    const powerSaver = document.getElementById("powerSaver");
    if (powerSaver) {
      powerSaver.addEventListener("change", (e) => {
        this.settings.powerSaver = e.target.checked;
        this.eventEmitter.emit(
          "settingChanged",
          "powerSaver",
          e.target.checked
        );
      });
    }

    const autoTheme = document.getElementById("autoTheme");
    if (autoTheme) {
      autoTheme.addEventListener("change", (e) => {
        this.settings.autoTheme = e.target.checked;
        this.eventEmitter.emit("settingChanged", "autoTheme", e.target.checked);
      });
    }

    if (this.volumeSlider && this.volumeValue) {
      this.volumeSlider.addEventListener("input", (e) => {
        this.settings.volume = e.target.value / 100;
        this.volumeValue.textContent = e.target.value + "%";
        this.eventEmitter.emit("volumeChanged", this.settings.volume);
      });
    }
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
    console.log(
      `⚙️ SettingsPanel toggle: ${this.isVisible ? "OPEN" : "CLOSED"}`
    );
    if (this.panel) {
      this.panel.classList.toggle("show", this.isVisible);
    }
    if (this.isVisible) {
      this.attachEventHandlers();
    }
  }

  hide() {
    this.isVisible = false;
    if (this.panel) {
      this.panel.classList.remove("show");
    }
  }

  loadSettings() {
    const checkboxes = {
      hourlyChime: this.settings.hourlyChime,
      tickSound: this.settings.tickSound,
      showSeconds: this.settings.showSeconds,
      smoothTransitions: this.settings.smoothTransitions,
      reducedMotion: this.settings.reducedMotion,
      powerSaver: this.settings.powerSaver,
      autoTheme: this.settings.autoTheme,
    };

    Object.entries(checkboxes).forEach(([id, value]) => {
      const checkbox = document.getElementById(id);
      if (checkbox) checkbox.checked = value;
    });

    if (this.volumeSlider && this.volumeValue) {
      this.volumeSlider.value = this.settings.volume * 100;
      this.volumeValue.textContent =
        Math.round(this.settings.volume * 100) + "%";
    }
  }

  updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    this.loadSettings();
  }

  getSettings() {
    return { ...this.settings };
  }

  destroy() {
    this.panel = null;
    this.volumeSlider = null;
    this.volumeValue = null;
  }
}
