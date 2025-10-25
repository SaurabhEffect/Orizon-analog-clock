//  ThemePanel Component

class ThemePanelComponent {
  constructor(container, eventEmitter) {
    this.container = container;
    this.eventEmitter = eventEmitter;
    this.isVisible = false;
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
    this.updateTimer = null;
    this.panel = null;
    this.themeGrid = null;
    this.customBuilder = null;

    this.init();
    this.setupEventListeners();
  }

  init() {
    this.cacheElements();
    this.attachEventHandlers();
    this.attachCustomThemeHandlers();
    this.loadCustomTheme();
  }

  cacheElements() {
    this.panel = this.container;
    this.themeGrid =
      document.querySelector(".theme-grid") ||
      document.querySelector(".theme-options") ||
      document.querySelector("[id*='theme']");
    this.customBuilder = document.getElementById("customThemeBuilder");
  }

  setupEventListeners() {
    this.eventEmitter.on("themePanelToggle", () => this.toggleVisibility());
    this.eventEmitter.on("closeAllPanels", () => this.hide());
    this.eventEmitter.on("themeApplied", (theme) => {
      this.updateActiveTheme(theme);
    });
  }

  attachEventHandlers() {
    const closeBtn = document.getElementById("closeThemePanel");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        this.hide();
      });
    }
    const themeOptions =
      document.querySelector(".theme-options") ||
      document.querySelector(".theme-grid");

    if (themeOptions) {
      themeOptions.addEventListener("click", (e) => {
        const themeOption = e.target.closest(".theme-option");
        if (themeOption) {
          e.preventDefault();
          const theme = themeOption.dataset.theme;
          if (theme) {
            this.eventEmitter.emit("themeChanged", theme);
          }
        }
      });
    }
    this.attachCustomThemeHandlers();
  }

  updateTheme() {
    console.log("Theme updated");
  }

  attachCustomThemeHandlers() {
    const colorInputs = document.querySelectorAll(
      '#customThemeBuilder input[type="color"], #customThemeBuilder input[type="range"]'
    );
    colorInputs.forEach((input) => {
      input.addEventListener("input", (e) => {
        this.debouncedUpdateCustomTheme(e.target);
      });
    });
    if (this.customBuilder) {
      this.customBuilder.addEventListener("click", (e) => {
        const presetBtn = e.target.closest(".preset-btn");
        if (presetBtn) {
          e.preventDefault();
          e.stopPropagation();
          const presetName = presetBtn.textContent
            .toLowerCase()
            .trim()
            .split("\n")[0];
          this.applyColorPreset(presetName);
        }
      });
    }
    const saveBtn = document.getElementById("saveCustomTheme");
    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        this.saveCustomTheme();
      });
    }
    const resetBtn = document.getElementById("resetCustomTheme");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        this.resetCustomTheme();
      });
    }
    const exportBtn = document.getElementById("exportTheme");
    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        this.exportTheme();
      });
    }
    const importBtn = document.getElementById("importTheme");
    if (importBtn) {
      importBtn.addEventListener("click", () => {
        this.importTheme();
      });
    }
  }

  debouncedUpdateCustomTheme(inputElement) {
    if (this.updateTimer) {
      clearTimeout(this.updateTimer);
    }
    this.updateTimer = setTimeout(() => {
      this.updateCustomThemeLive(inputElement);
    }, 16);
  }

  updateCustomThemeLive(inputElement) {
    const varName = inputElement.dataset.var;
    let value = inputElement.value;

    if (varName === "--glass-opacity") {
      value = parseFloat(value);
    }
    document.documentElement.style.setProperty(varName, value);
    this.customTheme[varName] = value;
    const currentAppliedTheme =
      document.documentElement.getAttribute("data-theme");
    if (currentAppliedTheme === "custom") {
      if (varName === "--bg-primary-start" || varName === "--bg-primary-end") {
        const startColor =
          this.customTheme["--bg-primary-start"] ||
          document.documentElement.style.getPropertyValue("--bg-primary-start");
        const endColor =
          this.customTheme["--bg-primary-end"] ||
          document.documentElement.style.getPropertyValue("--bg-primary-end");
        const gradient = `linear-gradient(135deg, ${startColor} 0%, ${endColor} 100%)`;
        document.documentElement.style.setProperty("--bg-primary", gradient);
      }
    }
  }

  saveCustomTheme() {
    const inputs = document.querySelectorAll(
      '#customThemeBuilder input[type="color"], #customThemeBuilder input[type="range"]'
    );
    inputs.forEach((input) => {
      let value = input.value;
      if (input.type === "range") value = parseFloat(value);
      this.customTheme[input.dataset.var] = value;
    });
    localStorage.setItem(
      "orizon-custom-theme",
      JSON.stringify(this.customTheme)
    );
    this.eventEmitter.emit("customThemeSaved", this.customTheme);
  }

  resetCustomTheme() {
    this.customTheme = { ...this.defaultCustomTheme };
    Object.entries(this.customTheme).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
      const input = document.querySelector(`[data-var="${property}"]`);
      if (input) input.value = value;
    });
    const gradient = `linear-gradient(135deg, ${this.customTheme["--bg-primary-start"]} 0%, ${this.customTheme["--bg-primary-end"]} 100%)`;
    document.documentElement.style.setProperty("--bg-primary", gradient);
    this.eventEmitter.emit("themeReset", this.customTheme);
  }

  exportTheme() {
    const themeData = {
      name: "ORIZON Custom Theme",
      version: "3.4",
      exportDate: new Date().toISOString(),
      theme: this.customTheme,
      metadata: {
        author: "ORIZON User",
        description: "Custom theme exported from ORIZON Clock",
      },
    };

    const dataStr = JSON.stringify(themeData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `orizon-theme-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    this.eventEmitter.emit("themeExported", themeData);
  }

  importTheme() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const themeData = JSON.parse(event.target.result);
          if (!themeData.theme || typeof themeData.theme !== "object") {
            throw new Error("Invalid theme format");
          }
          this.customTheme = {
            ...this.defaultCustomTheme,
            ...themeData.theme,
          };
          Object.entries(this.customTheme).forEach(([property, value]) => {
            document.documentElement.style.setProperty(property, value);
            const input = document.querySelector(`[data-var="${property}"]`);
            if (input) input.value = value;
          });
          const gradient = `linear-gradient(135deg, ${this.customTheme["--bg-primary-start"]} 0%, ${this.customTheme["--bg-primary-end"]} 100%)`;
          document.documentElement.style.setProperty("--bg-primary", gradient);
          this.eventEmitter.emit("themeChanged", "custom");
          this.eventEmitter.emit("themeImported", themeData);
        } catch (error) {
          console.error("Failed to import theme:", error);
          alert(
            "Failed to import theme. Please check the file format.\n\nError: " +
              error.message
          );
        }
      };
      reader.onerror = () => {
        console.error("Failed to read file");
        alert("Failed to read file");
      };
      reader.readAsText(file);
    };
    input.click();
  }

  loadCustomThemeInputs() {
    Object.entries(this.customTheme).forEach(([property, value]) => {
      const input = document.querySelector(`[data-var="${property}"]`);
      if (input) {
        input.value = value;
      }
    });
  }

  loadCustomTheme() {
    const savedTheme = localStorage.getItem("orizon-custom-theme");
    if (savedTheme) {
      try {
        this.customTheme = {
          ...this.defaultCustomTheme,
          ...JSON.parse(savedTheme),
        };
      } catch (error) {
        console.error("Failed to load saved custom theme:", error);
        this.customTheme = { ...this.defaultCustomTheme };
      }
    } else {
      this.customTheme = { ...this.defaultCustomTheme };
    }
  }

  applyColorPreset(presetName) {
    const presets = {
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

    const preset = presets[presetName];
    if (preset) {
      this.customTheme = { ...this.customTheme, ...preset };
      Object.entries(preset).forEach(([property, value]) => {
        document.documentElement.style.setProperty(property, value);
        const input = document.querySelector(`[data-var="${property}"]`);
        if (input) input.value = value;
      });
      const gradient = `linear-gradient(135deg, ${preset["--bg-primary-start"]} 0%, ${preset["--bg-primary-end"]} 100%)`;
      document.documentElement.style.setProperty("--bg-primary", gradient);
      this.eventEmitter.emit("presetApplied", presetName);
    }
  }

  clearCustomThemeVariables() {
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
    ];

    customVars.forEach((varName) => {
      document.documentElement.style.removeProperty(varName);
    });

    document.documentElement.style.removeProperty("--bg-primary");
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
    console.log(`🎨 ThemePanel toggle: ${this.isVisible ? "OPEN" : "CLOSED"}`);
    if (this.panel) {
      if (this.isVisible) {
        this.panel.classList.add("show");
      } else {
        this.panel.classList.remove("show");
      }
    }
  }

  hide() {
    this.isVisible = false;
    if (this.panel) {
      this.panel.classList.remove("show");
    }
    console.log("🚪 ThemePanel closed");
  }

  updateActiveTheme(themeName) {
    const themeButtons = document.querySelectorAll(".theme-option");
    themeButtons.forEach((option) => {
      const isActive = option.dataset.theme === themeName;
      option.classList.toggle("active", isActive);
    });

    if (this.customBuilder) {
      this.customBuilder.classList.toggle("show", themeName === "custom");
      if (themeName === "custom") {
        this.loadCustomThemeInputs();
      } else {
        this.clearCustomThemeVariables();
      }
    }
  }

  destroy() {
    if (this.updateTimer) {
      clearTimeout(this.updateTimer);
    }

    this.panel = null;
    this.themeGrid = null;
    this.customBuilder = null;
  }
}
