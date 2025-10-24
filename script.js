// ORIZON v3.1 - Added Timezone Toggle

class EnhancedThemeableClock {
  constructor() {
    this.isInitialized = false;
    this.clockUpdateInterval = null;
    this.dateUpdateInterval = null;
    this.digitalVisible = false;
    this.settingsVisible = false;
    this.themePanelVisible = false;
    this.currentTheme = "dark";
    this.autoTheme = false;
    this.smoothTransitions = true;
    this.showSeconds = true;
    this.reducedMotion = false;
    this.powerSaver = false;
    this.cursorHideTimeout = null;
    this.isSoundOn = false;
    this.audioContextStarted = false;
    this.synth = null;
    this.lastSecond = -1;
    this.isChimeOn = false;
    this.tickSound = false;
    this.chimeSynth = null;
    this.lastChimePlayedHour = -1;
    this.wakeLockSentinel = null;
    this.volume = 0.5;
    this.timezonePanelVisible = false;
    this.customTheme = {};
    this.defaultCustomTheme = {
      "--bg-primary-start": "#2e3440",
      "--bg-primary-end": "#3b4252",
      "--text-primary": "#eceff4",
      "--text-secondary": "#d8dee9",
      "--accent-color": "#88c0d0",
      "--accent-secondary": "#bf616a",
      "--bg-glass-color": "#4c566a",
      "--glass-opacity": "0.5",
      "--hour-hand-color": "#eceff4",
      "--minute-hand-color": "#d8dee9",
      "--second-hand-color": "#bf616a",
      "--center-dot-color": "#bf616a",
    };
    this.colorPresets = {
      ocean: {
        "--bg-primary-start": "#0077be",
        "--bg-primary-end": "#00a8cc",
        "--text-primary": "#ffffff",
        "--text-secondary": "#e0f7ff",
        "--accent-color": "#00d4ff",
        "--accent-secondary": "#ff6b35",
        "--bg-glass-color": "#0077be",
        "--glass-opacity": "0.6",
        "--hour-hand-color": "#ffffff",
        "--minute-hand-color": "#e0f7ff",
        "--second-hand-color": "#ff6b35",
        "--center-dot-color": "#ff6b35",
      },
      forest: {
        "--bg-primary-start": "#2d5016",
        "--bg-primary-end": "#4a7c59",
        "--text-primary": "#f0f8e8",
        "--text-secondary": "#c8e6c9",
        "--accent-color": "#76ff03",
        "--accent-secondary": "#ff5722",
        "--bg-glass-color": "#4a7c59",
        "--glass-opacity": "0.7",
        "--hour-hand-color": "#f0f8e8",
        "--minute-hand-color": "#c8e6c9",
        "--second-hand-color": "#ff5722",
        "--center-dot-color": "#ff5722",
      },
      volcano: {
        "--bg-primary-start": "#d32f2f",
        "--bg-primary-end": "#ff5722",
        "--text-primary": "#ffffff",
        "--text-secondary": "#ffcdd2",
        "--accent-color": "#ffeb3b",
        "--accent-secondary": "#ff9800",
        "--bg-glass-color": "#d32f2f",
        "--glass-opacity": "0.6",
        "--hour-hand-color": "#ffffff",
        "--minute-hand-color": "#ffcdd2",
        "--second-hand-color": "#ffeb3b",
        "--center-dot-color": "#ffeb3b",
      },
      lavender: {
        "--bg-primary-start": "#7b1fa2",
        "--bg-primary-end": "#9c27b0",
        "--text-primary": "#ffffff",
        "--text-secondary": "#e1bee7",
        "--accent-color": "#e91e63",
        "--accent-secondary": "#ff4081",
        "--bg-glass-color": "#7b1fa2",
        "--glass-opacity": "0.5",
        "--hour-hand-color": "#ffffff",
        "--minute-hand-color": "#e1bee7",
        "--second-hand-color": "#e91e63",
        "--center-dot-color": "#e91e63",
      },
      gold: {
        "--bg-primary-start": "#ff8f00",
        "--bg-primary-end": "#ffc107",
        "--text-primary": "#3e2723",
        "--text-secondary": "#6d4c41",
        "--accent-color": "#795548",
        "--accent-secondary": "#d32f2f",
        "--bg-glass-color": "#ff8f00",
        "--glass-opacity": "0.4",
        "--hour-hand-color": "#3e2723",
        "--minute-hand-color": "#6d4c41",
        "--second-hand-color": "#d32f2f",
        "--center-dot-color": "#d32f2f",
      },
      neon: {
        "--bg-primary-start": "#000000",
        "--bg-primary-end": "#1a1a1a",
        "--text-primary": "#00ff41",
        "--text-secondary": "#00ff88",
        "--accent-color": "#ff0080",
        "--accent-secondary": "#00ffff",
        "--bg-glass-color": "#000000",
        "--glass-opacity": "0.8",
        "--hour-hand-color": "#00ff41",
        "--minute-hand-color": "#00ff88",
        "--second-hand-color": "#ff0080",
        "--center-dot-color": "#ff0080",
      },
    };
    this.favoriteThemes = [];
    this.currentTimezone = "local";
    this.timezoneOffset = 0;
    this.init();
  }

  init() {
    this.loadThemePreferences();
    this.applyTheme(this.currentTheme);
    this.updateClock();
    this.updateDate();
    setTimeout(() => {
      this.setupIntervals();
      this.setupEnhancements();
      this.setupEventListeners();
      this.setupAutoTheme();
      this.setupAudio();
      this.isInitialized = true;
    }, 500);
    const savedTimezone = localStorage.getItem("orizon-timezone");
    if (savedTimezone) {
      this.changeTimezone(savedTimezone);
    }
    this.setupUIControls();
    this.setupOutsideClickDetection();
  }

  setupAudio() {
    if (typeof Tone !== "undefined") {
      this.synth = new Tone.PluckSynth({
        attackNoise: 1,
        dampening: 4000,
        resonance: 0.7,
      }).toDestination();

      this.chimeSynth = new Tone.MetalSynth({
        frequency: 300,
        envelope: { attack: 0.001, decay: 0.8, release: 0.1 },
        harmonicity: 6.1,
        modulationIndex: 20,
        resonance: 3000,
        octaves: 1.5,
      }).toDestination();

      this.synth.volume.value = Tone.gainToDb(this.volume);
      this.chimeSynth.volume.value = Tone.gainToDb(this.volume);
    }
    this.updateSoundIcon();
  }

  setupEventListeners() {
    document
      .getElementById("digitalToggle")
      ?.addEventListener("click", () => this.toggleDigitalDisplay());
    document
      .getElementById("themeToggle")
      ?.addEventListener("click", () => this.toggleThemePanel());
    document
      .getElementById("closeThemePanel")
      ?.addEventListener("click", () => this.toggleThemePanel());
    document
      .getElementById("settingsToggle")
      ?.addEventListener("click", () => this.toggleSettings());
    document
      .getElementById("closeSettings")
      ?.addEventListener("click", () => this.toggleSettings());
    document
      .getElementById("fullscreenToggle")
      ?.addEventListener("click", () => this.toggleFullscreen());
    document
      .getElementById("sidebarToggle")
      ?.addEventListener("click", () =>
        document.getElementById("sidebarArea")?.classList.toggle("is-open")
      );
    document
      .getElementById("soundToggle")
      ?.addEventListener("click", () => this.toggleSound());

    document
      .querySelectorAll(".theme-option")
      .forEach((option) =>
        option.addEventListener("click", () =>
          this.changeTheme(option.dataset.theme)
        )
      );

    document.getElementById("hourlyChime")?.addEventListener("change", (e) => {
      this.isChimeOn = e.target.checked;
      this.saveThemePreferences();
    });

    document.getElementById("tickSound")?.addEventListener("change", (e) => {
      this.tickSound = e.target.checked;
      this.saveThemePreferences();
    });

    document.getElementById("showSeconds")?.addEventListener("change", (e) => {
      this.showSeconds = e.target.checked;
      this.updateDigitalDisplay();
      this.saveThemePreferences();
    });

    document
      .getElementById("reducedMotion")
      ?.addEventListener("change", (e) => {
        this.reducedMotion = e.target.checked;
        document.body.classList.toggle("reduced-motion", this.reducedMotion);
        this.saveThemePreferences();
      });

    document.getElementById("powerSaver")?.addEventListener("change", (e) => {
      this.powerSaver = e.target.checked;
      this.updateClockInterval();
      this.saveThemePreferences();
    });

    document.getElementById("volumeSlider")?.addEventListener("input", (e) => {
      this.volume = e.target.value / 100;
      document.getElementById("volumeValue").textContent = e.target.value + "%";
      this.updateAudioVolume();
      this.saveThemePreferences();
    });

    document
      .querySelectorAll(
        '#customThemeBuilder input[type="color"], #customThemeBuilder input[type="range"]'
      )
      .forEach((input) =>
        input.addEventListener("input", (e) =>
          this.updateCustomThemeLive(e.target)
        )
      );

    document
      .getElementById("saveCustomTheme")
      ?.addEventListener("click", () => this.saveCustomTheme());
    document
      .getElementById("resetCustomTheme")
      ?.addEventListener("click", () => this.resetCustomTheme());
    document
      .getElementById("exportTheme")
      ?.addEventListener("click", () => this.exportTheme());
    document
      .getElementById("importTheme")
      ?.addEventListener("click", () => this.importTheme());
    document
      .getElementById("favoriteTheme")
      ?.addEventListener("click", () => this.toggleFavoriteTheme());

    document.addEventListener("click", (event) => {
      if (!this.themePanelVisible && !this.settingsVisible) {
        return;
      }
      const target = event.target;
      const isClickInsideLeftPanel = target.closest(".left-panel-container");
      const isClickInsideSidebar = target.closest(".sidebar-area");
      if (!isClickInsideLeftPanel && !isClickInsideSidebar) {
        if (this.themePanelVisible) {
          this.toggleThemePanel();
        }
        if (this.settingsVisible) {
          this.toggleSettings(false);
        }
      }
    });

    document
      .querySelectorAll(".preset-btn")
      .forEach((btn) =>
        btn.addEventListener("click", () =>
          this.applyColorPreset(btn.dataset.preset)
        )
      );

    document
      .getElementById("themeFileInput")
      ?.addEventListener("change", (e) => this.handleThemeImport(e));

    document.addEventListener("fullscreenchange", () =>
      this.handleFullscreenChange()
    );
    document.addEventListener("keydown", (e) => this.handleKeyDown(e));
    document.getElementById("timezoneToggle")?.addEventListener("click", () => {
      this.toggleTimezonePanel();
    });

    document
      .getElementById("closeTimezonePanel")
      ?.addEventListener("click", () => {
        if (this.timezonePanelVisible) {
          this.toggleTimezonePanel();
        }
      });

    document
      .getElementById("timezoneSelect")
      ?.addEventListener("change", (e) => {
        this.changeTimezone(e.target.value);
      });

    document.querySelectorAll(".city-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.changeTimezone(btn.dataset.timezone);
      });
    });
  }

  updateAudioVolume() {
    if (this.synth && this.chimeSynth) {
      this.synth.volume.value = Tone.gainToDb(this.volume);
      this.chimeSynth.volume.value = Tone.gainToDb(this.volume);
    }
  }

  updateClockInterval() {
    if (this.clockUpdateInterval) {
      clearInterval(this.clockUpdateInterval);
    }
    const interval = this.powerSaver ? 1000 : 50;
    this.clockUpdateInterval = setInterval(() => this.updateClock(), interval);
  }

  handleKeyDown(e) {
    const key = e.key.toLowerCase();
    const actions = {
      d: () => this.toggleDigitalDisplay(),
      t: () => this.toggleThemePanel(),
      s: () => this.toggleSettings(),
      f: () => this.toggleFullscreen(),
      m: () =>
        document.getElementById("sidebarArea")?.classList.toggle("is-open"),
      a: () => this.toggleSound(),
      q: () => this.quickThemeToggle(),
      z: () => this.togglePanel("timezonePanel"),
    };

    if (actions[key]) {
      e.preventDefault();
      actions[key]();
    } else if (e.key === "Escape") {
      if (this.settingsVisible) this.toggleSettings(false);
      if (this.themePanelVisible) this.toggleThemePanel();
    }
  }

  toggleThemePanel() {
    this.themePanelVisible = !this.themePanelVisible;

    const panel = document.getElementById("themePanel");

    if (this.themePanelVisible) {
      if (this.timezonePanelVisible) {
        this.toggleTimezonePanel();
      }
      if (this.settingsVisible) {
        this.toggleSettings(false);
      }
      panel?.classList.add("show");
    } else {
      panel?.classList.remove("show");
      const customBuilder = document.getElementById("customThemeBuilder");
      customBuilder?.classList.remove("show");
    }
  }

  toggleSettings(forceState = null) {
    if (forceState !== null) {
      this.settingsVisible = forceState;
    } else {
      this.settingsVisible = !this.settingsVisible;
    }

    const panel = document.getElementById("settingsPanel");

    if (this.settingsVisible) {
      if (this.themePanelVisible) {
        this.toggleThemePanel();
      }
      if (this.timezonePanelVisible) {
        this.toggleTimezonePanel();
      }

      panel?.classList.add("show");
    } else {
      panel?.classList.remove("show");
    }
  }

  toggleTimezonePanel() {
    this.timezonePanelVisible = !this.timezonePanelVisible;
    const panel = document.getElementById("timezonePanel");
    if (this.timezonePanelVisible) {
      if (this.themePanelVisible) {
        this.toggleThemePanel();
      }
      if (this.settingsVisible) {
        this.toggleSettings(false);
      }
      panel?.classList.add("show");
    } else {
      panel?.classList.remove("show");
    }
  }

  togglePanel(panelId) {
    const panel = document.getElementById(panelId);
    const isVisible = panel?.classList.contains("show");

    // Close all other panels first
    this.closeAllPanels();

    // Toggle requested panel
    if (!isVisible) {
      panel?.classList.add("show");
    }
  }

  closePanel(panelId) {
    const panel = document.getElementById(panelId);
    panel?.classList.remove("show");
  }

  closeAllPanels() {
    if (this.themePanelVisible) {
      this.toggleThemePanel();
    }
    if (this.settingsVisible) {
      this.toggleSettings(false);
    }
    const timezonePanel = document.getElementById("timezonePanel");
    timezonePanel?.classList.remove("show");
  }

  loadThemePreferences() {
    try {
      const saved = localStorage.getItem("orizon-theme-preferences");
      if (saved) {
        const prefs = JSON.parse(saved);
        this.currentTheme = prefs.theme || "dark";
        this.autoTheme = prefs.autoTheme || false;
        this.smoothTransitions = prefs.smoothTransitions !== false;
        this.digitalVisible = prefs.digitalVisible || false;
        this.isSoundOn = prefs.isSoundOn || false;
        this.isChimeOn = prefs.isChimeOn || false;
        this.tickSound = prefs.tickSound || false;
        this.showSeconds = prefs.showSeconds !== false;
        this.reducedMotion = prefs.reducedMotion || false;
        this.powerSaver = prefs.powerSaver || false;
        this.volume = prefs.volume || 0.5;
        this.customTheme = prefs.customTheme || { ...this.defaultCustomTheme };
        this.favoriteThemes = prefs.favoriteThemes || [];
      } else {
        this.customTheme = { ...this.defaultCustomTheme };
      }
    } catch (error) {
      console.warn("Could not load theme preferences:", error);
      this.customTheme = { ...this.defaultCustomTheme };
    }
  }

  saveThemePreferences() {
    try {
      const prefs = {
        theme: this.currentTheme,
        autoTheme: this.autoTheme,
        smoothTransitions: this.smoothTransitions,
        digitalVisible: this.digitalVisible,
        isSoundOn: this.isSoundOn,
        isChimeOn: this.isChimeOn,
        tickSound: this.tickSound,
        showSeconds: this.showSeconds,
        reducedMotion: this.reducedMotion,
        powerSaver: this.powerSaver,
        volume: this.volume,
        customTheme: this.customTheme,
        favoriteThemes: this.favoriteThemes,
      };
      localStorage.setItem("orizon-theme-preferences", JSON.stringify(prefs));
    } catch (error) {
      console.warn("Could not save theme preferences:", error);
    }
  }

  setupEnhancements() {
    if (this.digitalVisible) {
      setTimeout(() => this.toggleDigitalDisplay(), 100);
    }

    const checkboxes = {
      autoTheme: this.autoTheme,
      smoothTransitions: this.smoothTransitions,
      hourlyChime: this.isChimeOn,
      tickSound: this.tickSound,
      showSeconds: this.showSeconds,
      reducedMotion: this.reducedMotion,
      powerSaver: this.powerSaver,
    };

    Object.entries(checkboxes).forEach(([id, value]) => {
      const checkbox = document.getElementById(id);
      if (checkbox) checkbox.checked = value;
    });

    const volumeSlider = document.getElementById("volumeSlider");
    const volumeValue = document.getElementById("volumeValue");
    if (volumeSlider && volumeValue) {
      volumeSlider.value = this.volume * 100;
      volumeValue.textContent = Math.round(this.volume * 100) + "%";
    }

    if (this.reducedMotion) {
      document.body.classList.add("reduced-motion");
    }
  }

  setupOutsideClickDetection() {
    document.addEventListener("click", (e) => {
      const themePanelEl = document.getElementById("themePanel");
      const timezonePanelEl = document.getElementById("timezonePanel");
      const settingsPanelEl = document.getElementById("settingsPanel");
      const themeBtn = document.getElementById("themeToggle");
      const timezoneBtn = document.getElementById("timezoneToggle");
      const settingsBtn = document.getElementById("settingsToggle");
      const clickedElement = e.target;
      const isInsideThemePanel = themePanelEl?.contains(clickedElement);
      const isInsideTimezonePanel = timezonePanelEl?.contains(clickedElement);
      const isInsideSettingsPanel = settingsPanelEl?.contains(clickedElement);
      const isThemeButton = themeBtn?.contains(clickedElement);
      const isTimezoneButton = timezoneBtn?.contains(clickedElement);
      const isSettingsButton = settingsBtn?.contains(clickedElement);

      if (
        this.timezonePanelVisible &&
        !isInsideTimezonePanel &&
        !isTimezoneButton
      ) {
        this.toggleTimezonePanel();
      }

      if (this.themePanelVisible && !isInsideThemePanel && !isThemeButton) {
        this.toggleThemePanel();
      }

      if (this.settingsVisible && !isInsideSettingsPanel && !isSettingsButton) {
        this.toggleSettings(false);
      }
    });
  }

  updateClock() {
    const now = this.getCurrentTime();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    if (
      this.isSoundOn &&
      this.isChimeOn &&
      minutes === 0 &&
      seconds === 0 &&
      hours !== this.lastChimePlayedHour
    ) {
      if (this.chimeSynth && this.audioContextStarted) {
        this.chimeSynth.triggerAttackRelease("G5", "4n", Tone.now());
      }
      this.lastChimePlayedHour = hours;
    }

    this.updateAnalogClock(hours, minutes, seconds, now.getMilliseconds());
    this.updateDigitalDisplay(hours, minutes, seconds);
  }

  getCurrentTime() {
    if (this.currentTimezone === "local") {
      return new Date();
    }

    try {
      const localTime = new Date();
      const tzString = localTime.toLocaleString("en-US", {
        timeZone: this.currentTimezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const [datePart, timePart] = tzString.split(", ");
      const [month, day, year] = datePart.split("/");
      const [hours, minutes, seconds] = timePart.split(":");
      return new Date(
        year,
        month - 1,
        day,
        hours,
        minutes,
        seconds,
        localTime.getMilliseconds()
      );
    } catch (error) {
      console.error("Timezone conversion error:", error);
      return new Date();
    }
  }

  changeTimezone(timezone) {
    this.currentTimezone = timezone;
    const select = document.getElementById("timezoneSelect");
    if (select) select.value = timezone;
    const zoneName =
      timezone === "local"
        ? "Local Time"
        : timezone.replace("_", " ").replace("/", " - ");
    const offset = this.getTimezoneOffsetString(timezone);
    const nameElement = document.getElementById("currentZoneName");
    const offsetElement = document.getElementById("utcOffset");
    if (nameElement) nameElement.textContent = zoneName;
    if (offsetElement) offsetElement.textContent = `UTC ${offset}`;
    this.updateClock();
    this.updateDate();
    localStorage.setItem("orizon-timezone", timezone);
    console.log(`🌍 Timezone changed to: ${zoneName} (${offset})`);
  }

  getTimezoneOffsetString(timezone) {
    if (timezone === "local") {
      const offset = -new Date().getTimezoneOffset();
      const hours = Math.floor(Math.abs(offset) / 60);
      const minutes = Math.abs(offset) % 60;
      const sign = offset >= 0 ? "+" : "-";
      return `${sign}${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}`;
    }

    try {
      const now = new Date();
      const utcDate = new Date(
        now.toLocaleString("en-US", { timeZone: "UTC" })
      );
      const tzDate = new Date(
        now.toLocaleString("en-US", { timeZone: timezone })
      );
      const offsetMinutes = Math.round((tzDate - utcDate) / 60000);
      const hours = Math.floor(Math.abs(offsetMinutes) / 60);
      const minutes = Math.abs(offsetMinutes) % 60;
      const sign = offsetMinutes >= 0 ? "+" : "-";

      return `${sign}${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}`;
    } catch (error) {
      console.error("Offset calculation error:", error);
      return "+00:00";
    }
  }

  updateAnalogClock(hours, minutes, seconds, milliseconds) {
    const hourAngle = (hours % 12) * 30 + minutes * 0.5 + seconds * (0.5 / 60);
    const minuteAngle = minutes * 6 + seconds * 0.1;
    const secondAngle = seconds * 6 + milliseconds * 0.006;

    if (
      this.isSoundOn &&
      this.tickSound &&
      this.synth &&
      seconds !== this.lastSecond
    ) {
      if (this.audioContextStarted) {
        this.synth.triggerAttack("C5", Tone.now());
      }
      this.lastSecond = seconds;
    }

    const secondHand = document.getElementById("secondHand");
    if (secondHand) {
      if (seconds === 0 && this.lastSecond === 59) {
        secondHand.style.transition = "none";
      } else {
        secondHand.style.transition = this.powerSaver
          ? "none"
          : "transform 0.1s ease-out";
      }
    }

    this.updateHand("hourHand", hourAngle);
    this.updateHand("minuteHand", minuteAngle);
    this.updateHand("secondHand", secondAngle);
  }

  updateDigitalDisplay(hours, minutes, seconds) {
    if (!this.digitalVisible) return;

    const hoursDisplay = document.querySelector(".time-hours");
    const minutesDisplay = document.querySelector(".time-minutes");
    const secondsDisplay = document.querySelector(".time-seconds");
    const periodDisplay = document.querySelector(".time-period");

    if (hoursDisplay && minutesDisplay && secondsDisplay && periodDisplay) {
      const displayHours = hours % 12 || 12;
      const period = hours >= 12 ? "PM" : "AM";

      hoursDisplay.textContent = displayHours.toString().padStart(2, "0");
      minutesDisplay.textContent = minutes.toString().padStart(2, "0");

      if (this.showSeconds) {
        secondsDisplay.textContent = seconds.toString().padStart(2, "0");
        secondsDisplay.style.display = "inline-block";
        document.querySelectorAll(".time-separator")[1].style.display =
          "inline";
      } else {
        secondsDisplay.style.display = "none";
        document.querySelectorAll(".time-separator")[1].style.display = "none";
      }

      periodDisplay.textContent = period;
    }
  }

  applyTheme(themeName) {
    document.documentElement.setAttribute("data-theme", themeName);
    this.currentTheme = themeName;

    document.querySelectorAll(".theme-option").forEach((option) => {
      option.classList.toggle("active", option.dataset.theme === themeName);
    });

    const builder = document.getElementById("customThemeBuilder");
    if (themeName === "custom") {
      builder?.classList.add("show");
      this.applyCustomTheme();
      this.updateColorPickers();
    } else {
      builder?.classList.remove("show");
      this.clearCustomStyles();
    }

    this.saveThemePreferences();
  }

  updateCustomThemeLive(inputElement) {
    const varName = inputElement.dataset.var;
    const value = inputElement.value;

    if (inputElement.type === "range") {
      document.documentElement.style.setProperty(varName, value);
    } else {
      document.documentElement.style.setProperty(varName, value);
    }

    if (varName === "--bg-primary-start" || varName === "--bg-primary-end") {
      const start = document.getElementById("bgColorStart").value;
      const end = document.getElementById("bgColorEnd").value;
      document.documentElement.style.setProperty(
        "--bg-primary",
        `linear-gradient(135deg, ${start} 0%, ${end} 100%)`
      );
    }

    if (varName === "--bg-glass-color" || varName === "--glass-opacity") {
      const color = document.getElementById("glassColor").value;
      const opacity = document.getElementById("glassOpacity").value;
      document.documentElement.style.setProperty(
        "--bg-glass",
        `color-mix(in srgb, ${color} ${opacity * 100}%, transparent)`
      );
    }
  }

  saveCustomTheme() {
    const inputs = document.querySelectorAll(
      '#customThemeBuilder input[type="color"], #customThemeBuilder input[type="range"]'
    );
    inputs.forEach((input) => {
      this.customTheme[input.dataset.var] = input.value;
    });

    const themeName = document.getElementById("themeNameInput")?.value.trim();
    if (themeName) {
      this.customTheme.name = themeName;
    }

    this.saveThemePreferences();

    const saveBtn = document.getElementById("saveCustomTheme");
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = '<i class="fa-solid fa-check"></i> Saved!';
    saveBtn.style.background = "var(--accent-green)";

    setTimeout(() => {
      saveBtn.innerHTML = originalText;
      saveBtn.style.background = "";
    }, 2000);
  }

  resetCustomTheme() {
    this.customTheme = { ...this.defaultCustomTheme };
    this.applyCustomTheme();
    this.updateColorPickers();
    this.saveThemePreferences();

    const themeNameInput = document.getElementById("themeNameInput");
    if (themeNameInput) themeNameInput.value = "";
  }

  applyCustomTheme() {
    Object.entries(this.customTheme).forEach(([property, value]) => {
      if (property !== "name") {
        document.documentElement.style.setProperty(property, value);
      }
    });

    const start = this.customTheme["--bg-primary-start"];
    const end = this.customTheme["--bg-primary-end"];
    if (start && end) {
      document.documentElement.style.setProperty(
        "--bg-primary",
        `linear-gradient(135deg, ${start} 0%, ${end} 100%)`
      );
    }

    const glassColor = this.customTheme["--bg-glass-color"];
    const glassOpacity = this.customTheme["--glass-opacity"];
    if (glassColor && glassOpacity) {
      document.documentElement.style.setProperty(
        "--bg-glass",
        `color-mix(in srgb, ${glassColor} ${glassOpacity * 100}%, transparent)`
      );
    }
  }

  clearCustomStyles() {
    Object.keys(this.defaultCustomTheme).forEach((property) => {
      document.documentElement.style.removeProperty(property);
    });
    document.documentElement.style.removeProperty("--bg-primary");
    document.documentElement.style.removeProperty("--bg-glass");
  }

  updateColorPickers() {
    Object.entries(this.customTheme).forEach(([property, value]) => {
      const input = document.querySelector(`[data-var="${property}"]`);
      if (input && property !== "name") {
        input.value = value;
      }
    });

    const themeNameInput = document.getElementById("themeNameInput");
    if (themeNameInput && this.customTheme.name) {
      themeNameInput.value = this.customTheme.name;
    }
  }

  applyColorPreset(presetName) {
    const preset = this.colorPresets[presetName];
    if (!preset) return;

    this.customTheme = { ...this.customTheme, ...preset };
    this.applyCustomTheme();
    this.updateColorPickers();

    const presetBtn = document.querySelector(`[data-preset="${presetName}"]`);
    const originalBg = presetBtn.style.background;
    presetBtn.style.background = "var(--accent-color)";
    presetBtn.style.color = "white";

    setTimeout(() => {
      presetBtn.style.background = originalBg;
      presetBtn.style.color = "";
    }, 1000);
  }

  exportTheme() {
    const themeData = {
      name: this.customTheme.name || "Custom Theme",
      version: "3.2",
      theme: this.customTheme,
      timestamp: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(themeData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `orizon-theme-${themeData.name
      .toLowerCase()
      .replace(/\s+/g, "-")}.json`;
    link.click();

    URL.revokeObjectURL(url);
  }

  importTheme() {
    document.getElementById("themeFileInput").click();
  }

  handleThemeImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const themeData = JSON.parse(e.target.result);
        if (themeData.theme) {
          this.customTheme = { ...this.defaultCustomTheme, ...themeData.theme };
          this.applyCustomTheme();
          this.updateColorPickers();
          this.saveThemePreferences();

          const importBtn = document.getElementById("importTheme");
          const originalText = importBtn.innerHTML;
          importBtn.innerHTML = '<i class="fa-solid fa-check"></i> Imported!';
          importBtn.style.background = "var(--accent-green)";

          setTimeout(() => {
            importBtn.innerHTML = originalText;
            importBtn.style.background = "";
          }, 2000);
        }
      } catch (error) {
        console.error("Failed to import theme:", error);
        alert("Failed to import theme. Please check the file format.");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  toggleFavoriteTheme() {
    const currentThemeData = {
      name: this.customTheme.name || "Unnamed Theme",
      theme: { ...this.customTheme },
    };

    const existingIndex = this.favoriteThemes.findIndex(
      (theme) => theme.name === currentThemeData.name
    );

    const favoriteBtn = document.getElementById("favoriteTheme");

    if (existingIndex >= 0) {
      this.favoriteThemes.splice(existingIndex, 1);
      favoriteBtn.classList.remove("active");
    } else {
      this.favoriteThemes.push(currentThemeData);
      favoriteBtn.classList.add("active");
    }

    this.saveThemePreferences();
  }

  changeTheme(themeName) {
    if (this.currentTheme === themeName) return;
    this.applyTheme(themeName);
  }

  quickThemeToggle() {
    const themes = ["dark", "light", "midnight", "sunset", "custom"];
    const currentIndex = themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    this.changeTheme(themes[nextIndex]);
  }

  async toggleSound() {
    if (typeof Tone === "undefined") return;

    if (!this.audioContextStarted) {
      await Tone.start();
      this.audioContextStarted = true;
    }

    this.isSoundOn = !this.isSoundOn;
    this.updateSoundIcon();
    this.saveThemePreferences();
  }

  updateSoundIcon() {
    const soundToggle = document.getElementById("soundToggle");
    if (soundToggle) {
      const icon = soundToggle.querySelector(".btn-icon i");
      if (this.isSoundOn) {
        icon.classList.replace("fa-volume-xmark", "fa-volume-high");
        soundToggle.classList.add("active");
      } else {
        icon.classList.replace("fa-volume-high", "fa-volume-xmark");
        soundToggle.classList.remove("active");
      }
    }
  }

  toggleDigitalDisplay() {
    const digitalDisplay = document.getElementById("digitalDisplay");
    const digitalToggle = document.getElementById("digitalToggle");
    if (!digitalDisplay || !digitalToggle) return;

    this.digitalVisible = !this.digitalVisible;

    if (this.digitalVisible) {
      digitalDisplay.classList.add("show");
      digitalToggle.classList.add("active");
      digitalToggle.querySelector(".btn-text").textContent = "Hide";
    } else {
      digitalDisplay.classList.remove("show");
      digitalToggle.classList.remove("active");
      digitalToggle.querySelector(".btn-text").textContent = "Digital";
    }

    this.saveThemePreferences();
  }

  handleFullscreenChange() {
    const fullscreenToggle = document.getElementById("fullscreenToggle");
    if (document.fullscreenElement) {
      document.body.classList.add("is-fullscreen");
      fullscreenToggle
        .querySelector(".btn-icon i")
        .classList.replace("fa-expand", "fa-compress");
      this.manageCursorVisibility();
      this.acquireWakeLock();
    } else {
      document.body.classList.remove("is-fullscreen");
      fullscreenToggle
        .querySelector(".btn-icon i")
        .classList.replace("fa-compress", "fa-expand");
      this.stopCursorManagement();
      this.releaseWakeLock();
    }
  }

  manageCursorVisibility() {
    document.body.classList.add("hide-cursor");
    this.mouseMoveHandler = () => {
      document.body.classList.remove("hide-cursor");
      clearTimeout(this.cursorHideTimeout);
      this.cursorHideTimeout = setTimeout(() => {
        document.body.classList.add("hide-cursor");
      }, 3000);
    };
    window.addEventListener("mousemove", this.mouseMoveHandler);
  }

  stopCursorManagement() {
    clearTimeout(this.cursorHideTimeout);
    if (this.mouseMoveHandler) {
      window.removeEventListener("mousemove", this.mouseMoveHandler);
    }
    document.body.classList.remove("hide-cursor");
  }

  async acquireWakeLock() {
    if ("wakeLock" in navigator) {
      try {
        this.wakeLockSentinel = await navigator.wakeLock.request("screen");
        this.wakeLockSentinel.addEventListener("release", () => {
          this.wakeLockSentinel = null;
        });
      } catch (err) {
        console.error(`${err.name}, ${err.message}`);
      }
    }
  }

  async releaseWakeLock() {
    if (this.wakeLockSentinel !== null) {
      await this.wakeLockSentinel.release();
      this.wakeLockSentinel = null;
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .catch((err) => console.error(err));
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  setupAutoTheme() {
    const autoThemeCheckbox = document.getElementById("autoTheme");
    if (autoThemeCheckbox) {
      autoThemeCheckbox.checked = this.autoTheme;
      autoThemeCheckbox.addEventListener("change", (e) => {
        this.autoTheme = e.target.checked;
        this.saveThemePreferences();
        if (this.autoTheme) {
          this.applyAutoTheme();
        }
      });
    }
  }

  applyAutoTheme() {
    if (!this.autoTheme) return;

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
    if (autoTheme !== this.currentTheme) {
      this.changeTheme(autoTheme);
    }
  }

  setupIntervals() {
    this.updateClockInterval();
    this.dateUpdateInterval = setInterval(() => this.updateDate(), 60000);
    if (this.autoTheme) {
      setInterval(() => this.applyAutoTheme(), 3600000);
    }
  }

  updateHand(handId, angle) {
    const hand = document.getElementById(handId);
    if (hand) {
      requestAnimationFrame(() => {
        hand.style.transform = `rotate(${angle}deg)`;
      });
    }
  }

  updateDate() {
    const now = this.getCurrentTime();
    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const dayOptions = { weekday: "long" };
    const dateEl = document.querySelector(".date-text");
    const dayEl = document.querySelector(".day-text");

    if (dateEl)
      dateEl.textContent = now.toLocaleDateString("en-US", dateOptions);
    if (dayEl)
      dayEl.textContent = `Today is ${now.toLocaleDateString(
        "en-US",
        dayOptions
      )}`;
  }

  destroy() {
    clearInterval(this.clockUpdateInterval);
    clearInterval(this.dateUpdateInterval);
    this.stopCursorManagement();
    this.releaseWakeLock();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const clock = new EnhancedThemeableClock();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && clock.wakeLockSentinel) {
      clock.releaseWakeLock();
    } else if (!document.hidden && document.fullscreenElement) {
      clock.acquireWakeLock();
    }
  });

  window.addEventListener("beforeunload", () => clock.destroy());
});
