// Clock.js - Renders and manages the analog clock display

class ClockComponent {
  constructor(container, eventEmitter) {
    this.container = container;
    this.eventEmitter = eventEmitter;
    this.currentTime = new Date();
    this.powerSaver = false;
    this.hourHand = null;
    this.minuteHand = null;
    this.secondHand = null;
    this.lastRaw = {
      hour: -1,
      minute: -1,
      second: -1,
    };
    this.cumulativeRotation = {
      hour: 0,
      minute: 0,
      second: 0,
    };
    this.init();
    this.setupEventListeners();
  }

  init() {
    this.cacheElements();
    this.currentTime = TimeUtils.getCurrentTime("local");
    this.update(true);
  }

  cacheElements() {
    this.hourHand = document.getElementById("hourHand");
    this.minuteHand = document.getElementById("minuteHand");
    this.secondHand = document.getElementById("secondHand");
  }

  setupEventListeners() {
    this.eventEmitter.on("timeUpdate", (time, timezone) => {
      this.currentTime = time;
      this.update(false);
    });

    this.eventEmitter.on("themeChanged", () => {
      this.updateTheme();
    });

    this.eventEmitter.on("powerSaverChanged", (enabled) => {
      this.powerSaver = enabled;
      this.setHandTransition(this.hourHand, false);
      this.setHandTransition(this.minuteHand, false);
      this.setHandTransition(this.secondHand, false);
    });
  }

  update(isInitialUpdate = false) {
    if (!this.currentTime) return;
    const newAngles = TimeUtils.calculateHandAngles(this.currentTime);
    const newRaw = {
      hour: this.currentTime.getHours(),
      minute: this.currentTime.getMinutes(),
      second: this.currentTime.getSeconds(),
    };

    if (this.lastRaw.second !== -1 && newRaw.second < this.lastRaw.second) {
      this.cumulativeRotation.second += 360;
      console.log("⏰ Second hand full rotation");
    }
    if (this.lastRaw.minute !== -1 && newRaw.minute < this.lastRaw.minute) {
      this.cumulativeRotation.minute += 360;
    }
    if (this.lastRaw.hour !== -1 && newRaw.hour < this.lastRaw.hour) {
      this.cumulativeRotation.hour += 360;
    }

    // Last raw values update karein
    this.lastRaw = newRaw;

    // Final angles calculate karein
    const continuousHourAngle = this.cumulativeRotation.hour + newAngles.hour;
    const continuousMinuteAngle =
      this.cumulativeRotation.minute + newAngles.minute;
    const continuousSecondAngle =
      this.cumulativeRotation.second + newAngles.second;

    this.setHandTransition(this.hourHand, isInitialUpdate);
    this.setHandTransition(this.minuteHand, isInitialUpdate);
    this.setHandTransition(this.secondHand, isInitialUpdate);

    this.updateHand(this.hourHand, continuousHourAngle);
    this.updateHand(this.minuteHand, continuousMinuteAngle);
    this.updateHand(this.secondHand, continuousSecondAngle);
  }

  setHandTransition(hand, isInitial) {
    if (!hand) return;
    if (isInitial) {
      hand.style.transition = "none";
      return;
    }
    if (this.powerSaver) {
      hand.style.transition = "none";
    } else {
      if (hand === this.secondHand) {
        hand.style.transition = "transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)";
      } else {
        hand.style.transition = "transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)";
      }
    }
  }

  updateTheme() {
    console.log("Clock theme updated");
  }

  updateHand(hand, angle) {
    if (hand) {
      requestAnimationFrame(() => {
        hand.style.transform = `rotate(${angle}deg)`;
      });
    }
  }

  handleFullscreenChange(isFullscreen) {
    const clockElement = this.container.querySelector(".clock");
    if (clockElement) {
      clockElement.classList.toggle("fullscreen-mode", isFullscreen);
    }
  }

  destroy() {
    this.hourHand = null;
    this.minuteHand = null;
    this.secondHand = null;
  }
}
