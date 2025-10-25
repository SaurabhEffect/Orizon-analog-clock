// DigitalDisplay.js - Shows digital time format

class DigitalDisplayComponent {
  constructor(container, eventEmitter) {
    this.container = container;
    this.eventEmitter = eventEmitter;
    this.isVisible = false;
    this.showSeconds = true;
    this.format12Hour = true;
    this.currentTime = new Date();
    this.hoursDisplay = null;
    this.minutesDisplay = null;
    this.secondsDisplay = null;
    this.periodDisplay = null;
    this.separators = null;
    this.displayElement = null;

    this.init();
    this.setupEventListeners();
  }

  init() {
    this.cacheElements();
  }

  cacheElements() {
    this.displayElement = this.container;
    this.hoursDisplay = this.container.querySelector(".time-hours");
    this.minutesDisplay = this.container.querySelector(".time-minutes");
    this.secondsDisplay = this.container.querySelector(".time-seconds");
    this.periodDisplay = this.container.querySelector(".time-period");
    this.separators = this.container.querySelectorAll(".time-separator");
  }

  setupEventListeners() {
    this.eventEmitter.on("timeUpdate", (time) => {
      this.currentTime = time;
      this.update();
    });
    this.eventEmitter.on("digitalToggled", (isVisible) => {
      this.isVisible = isVisible;
      this.toggleVisibility();
    });
    this.eventEmitter.on("showSecondsChanged", (showSeconds) => {
      this.showSeconds = showSeconds;
      this.update();
    });
  }

  update() {
    if (!this.isVisible) return;
    const formattedTime = TimeUtils.formatDigitalTime(this.currentTime, {
      format12Hour: this.format12Hour,
      showSeconds: this.showSeconds,
      padZeros: true,
    });

    if (
      this.hoursDisplay &&
      this.minutesDisplay &&
      this.secondsDisplay &&
      this.periodDisplay
    ) {
      this.hoursDisplay.textContent = formattedTime.hours;
      this.minutesDisplay.textContent = formattedTime.minutes;
      this.periodDisplay.textContent = formattedTime.period;

      if (this.showSeconds) {
        this.secondsDisplay.textContent = formattedTime.seconds;
        this.secondsDisplay.style.display = "inline-block";
        if (this.separators[1]) this.separators[1].style.display = "inline";
      } else {
        this.secondsDisplay.style.display = "none";
        if (this.separators[1]) this.separators[1].style.display = "none";
      }
    }
  }

  toggleVisibility() {
    if (this.displayElement) {
      this.displayElement.classList.toggle("show", this.isVisible);
      if (this.isVisible) {
        this.update();
      }
    }
  }

  setTimeFormat(is12Hour) {
    this.format12Hour = is12Hour;
    this.update();
  }

  destroy() {
    this.hoursDisplay = null;
    this.minutesDisplay = null;
    this.secondsDisplay = null;
    this.periodDisplay = null;
    this.separators = null;
    this.displayElement = null;
  }
}
