// DateDisplay.js - Shows current date with formatting options

class DateDisplayComponent {
  constructor(container, eventEmitter) {
    this.container = container;
    this.eventEmitter = eventEmitter;
    this.currentDate = new Date();
    this.locale = "en-US";
    this.dateText = null;
    this.dayText = null;
    this.init();
    this.setupEventListeners();
  }

  init() {
    this.cacheElements();
    this.update();
  }

  cacheElements() {
    this.dateText = this.container.querySelector(".date-text");
    this.dayText = this.container.querySelector(".day-text");
  }

  setupEventListeners() {
    this.eventEmitter.on("dateUpdate", (time) => {
      this.currentDate = time;
      this.update();
    });

    this.eventEmitter.on("timeUpdate", (time) => {
      if (time.getDate() !== this.currentDate.getDate()) {
        this.currentDate = time;
        this.update();
      }
    });
  }

  update() {
    const formattedDate = TimeUtils.formatDate(this.currentDate, {
      locale: this.locale,
      includeYear: true,
      includeWeekday: true,
    });
    if (this.dateText) {
      this.dateText.textContent = formattedDate.fullDate;
    }
    if (this.dayText) {
      this.dayText.textContent = formattedDate.todayText;
    }
  }

  setLocale(locale) {
    this.locale = locale;
    this.update();
  }

  destroy() {
    this.dateText = null;
    this.dayText = null;
  }
}
