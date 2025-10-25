// ControlPanel.js - Manages sidebar navigation and control buttons

class ControlPanelComponent {
  constructor(container, eventEmitter) {
    this.container = container;
    this.eventEmitter = eventEmitter;
    this.isOpen = false;
    this.sidebarArea = null;
    this.sidebarToggle = null;
    this.soundToggle = null;
    this.digitalToggle = null;
    this.fullscreenToggle = null;
    this.init();
    this.setupEventListeners();
  }

  init() {
    this.cacheElements();
    this.attachEventHandlers();
  }

  cacheElements() {
    this.sidebarArea = document.getElementById("sidebarArea");
    this.sidebarToggle = document.getElementById("sidebarToggle");
    this.soundToggle = document.getElementById("soundToggle");
    this.digitalToggle = document.getElementById("digitalToggle");
    this.fullscreenToggle = document.getElementById("fullscreenToggle");
  }

  setupEventListeners() {
    this.eventEmitter.on("audioToggled", (isEnabled) => {
      this.updateSoundButton(isEnabled);
    });
    this.eventEmitter.on("digitalToggled", (isVisible) => {
      this.updateDigitalButton(isVisible);
    });
    this.eventEmitter.on("fullscreenChanged", (isFullscreen) => {
      this.updateFullscreenButton(isFullscreen);
    });
  }

  attachEventHandlers() {
    if (this.sidebarToggle) {
      this.sidebarToggle.addEventListener("click", () => this.toggleSidebar());
    }
    if (this.digitalToggle) {
      this.digitalToggle.addEventListener("click", () => {
        this.eventEmitter.emit("toggleDigitalDisplay");
      });
    }
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        this.eventEmitter.emit("toggleThemePanel");
      });
    }
    const timezoneToggle = document.getElementById("timezoneToggle");
    if (timezoneToggle) {
      timezoneToggle.addEventListener("click", () => {
        this.eventEmitter.emit("toggleTimezonePanel");
      });
    }
    if (this.soundToggle) {
      this.soundToggle.addEventListener("click", () => {
        this.eventEmitter.emit("toggleSound");
      });
    }
    const settingsToggle = document.getElementById("settingsToggle");
    if (settingsToggle) {
      settingsToggle.addEventListener("click", () => {
        this.eventEmitter.emit("toggleSettingsPanel");
      });
    }
    if (this.fullscreenToggle) {
      this.fullscreenToggle.addEventListener("click", () => {
        this.eventEmitter.emit("toggleFullscreen");
      });
    }
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
    if (this.sidebarArea) {
      this.sidebarArea.classList.toggle("is-open", this.isOpen);
    }
    const toggleIcon = this.sidebarToggle?.querySelector(".btn-icon i");
    if (toggleIcon) {
      if (this.isOpen) {
        toggleIcon.classList.replace("fa-bars", "fa-xmark");
      } else {
        toggleIcon.classList.replace("fa-xmark", "fa-bars");
      }
    }
  }

  updateSoundButton(isEnabled) {
    const icon = this.soundToggle?.querySelector(".btn-icon i");
    if (icon && this.soundToggle) {
      if (isEnabled) {
        icon.classList.replace("fa-volume-xmark", "fa-volume-high");
        this.soundToggle.classList.add("active");
      } else {
        icon.classList.replace("fa-volume-high", "fa-volume-xmark");
        this.soundToggle.classList.remove("active");
      }
    }
  }

  updateDigitalButton(isVisible) {
    const textSpan = this.digitalToggle?.querySelector(".btn-text");
    if (this.digitalToggle && textSpan) {
      this.digitalToggle.classList.toggle("active", isVisible);
      textSpan.textContent = isVisible ? "Hide" : "Digital";
    }
  }

  updateFullscreenButton(isFullscreen) {
    const icon = this.fullscreenToggle?.querySelector(".btn-icon i");
    if (icon) {
      if (isFullscreen) {
        icon.classList.replace("fa-expand", "fa-compress");
      } else {
        icon.classList.replace("fa-compress", "fa-expand");
      }
    }
  }

  closeSidebar() {
    if (this.isOpen) {
      this.toggleSidebar();
    }
  }

  destroy() {
    this.sidebarArea = null;
    this.sidebarToggle = null;
    this.soundToggle = null;
    this.digitalToggle = null;
    this.fullscreenToggle = null;
  }
}
