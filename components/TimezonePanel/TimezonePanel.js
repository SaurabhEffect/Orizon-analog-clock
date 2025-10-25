// TimezonePanel.js - World clock and timezone selection

class TimezonePanelComponent {
  constructor(container, eventEmitter) {
    this.container = container;
    this.eventEmitter = eventEmitter;
    this.isVisible = false;
    this.currentTimezone = "local";
    this.panel = null;
    this.timezoneSelect = null;
    this.currentZoneName = null;
    this.utcOffset = null;

    this.init();
    this.setupEventListeners();
  }

  init() {
    this.cacheElements();
    this.attachEventHandlers();
    this.updateTimezoneInfo();
  }

  cacheElements() {
    this.panel = this.container;
    this.timezoneSelect = document.getElementById("timezoneSelect");
    this.currentZoneName = document.getElementById("currentZoneName");
    this.utcOffset = document.getElementById("utcOffset");
  }

  setupEventListeners() {
    this.eventEmitter.on("timezonePanelToggle", () => this.toggleVisibility());
    this.eventEmitter.on("closeAllPanels", () => this.hide());
    this.eventEmitter.on("timezoneChanged", (timezone) => {
      this.currentTimezone = timezone;
      this.updateTimezoneInfo();
    });
  }

  attachEventHandlers() {
    const closeBtn = document.getElementById("closeTimezonePanel");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.hide());
    }
    if (this.timezoneSelect) {
      this.timezoneSelect.addEventListener("change", (e) => {
        this.changeTimezone(e.target.value);
      });
    }
    document.querySelectorAll(".city-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.changeTimezone(btn.dataset.timezone);
      });
    });
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
    console.log(
      `🌍 TimezonePanel toggle: ${this.isVisible ? "OPEN" : "CLOSED"}`
    );
    if (this.panel) {
      this.panel.classList.toggle("show", this.isVisible);
    }
  }

  hide() {
    this.isVisible = false;
    if (this.panel) {
      this.panel.classList.remove("show");
    }
  }

  changeTimezone(timezone) {
    this.currentTimezone = timezone;
    this.eventEmitter.emit("timezoneChanged", timezone);
    if (this.timezoneSelect) {
      this.timezoneSelect.value = timezone;
    }
    this.updateTimezoneInfo();
  }

  updateTimezoneInfo() {
    const zoneName = TimeUtils.getTimezoneDisplayName(this.currentTimezone);
    if (this.currentZoneName) {
      this.currentZoneName.textContent = zoneName;
    }
    const offset = TimeUtils.getTimezoneOffsetString(this.currentTimezone);
    if (this.utcOffset) {
      this.utcOffset.textContent = `UTC ${offset}`;
    }
  }

  destroy() {
    this.panel = null;
    this.timezoneSelect = null;
    this.currentZoneName = null;
    this.utcOffset = null;
  }
}
