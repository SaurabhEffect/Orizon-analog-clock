// Clock.js - Renders and manages the analog clock display

class ClockComponent {
  constructor(container, eventEmitter) {
    this.container = container;
    this.eventEmitter = eventEmitter;
    this.currentTime = new Date();
    this.previousSecond = -1;
    this.powerSaver = false;
    this.cumulativeSecondRotation = 0;
    this.cumulativeMinuteRotation = 0;
    this.cumulativeHourRotation = 0;
    this.hourHand = null;
    this.minuteHand = null;
    this.secondHand = null;
    this.init();
    this.setupEventListeners();
  }

  init() {
    this.cacheElements();
    this.update();
  }

  cacheElements() {
    this.hourHand = document.getElementById("hourHand");
    this.minuteHand = document.getElementById("minuteHand");
    this.secondHand = document.getElementById("secondHand");
  }

  setupEventListeners() {
    this.eventEmitter.on("timeUpdate", (time, timezone) => {
      this.currentTime = time;
      this.update();
    });

    this.eventEmitter.on("themeChanged", () => {
      this.updateTheme();
    });

    this.eventEmitter.on("powerSaverChanged", (enabled) => {
      this.powerSaver = enabled;
    });
  }

  update() {
    const angles = TimeUtils.calculateHandAngles(this.currentTime);
    const seconds = this.currentTime.getSeconds();
    if (this.secondHand) {
      if (seconds !== this.previousSecond) {
        if (this.previousSecond === 59 && seconds === 0) {
          this.cumulativeSecondRotation += 360;
          console.log("⏰ Second hand completed full rotation, continuing...");
        }
        this.secondHand.style.transition = this.powerSaver
          ? "none"
          : "transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)";
      }
    }

    const continuousSecondAngle = this.cumulativeSecondRotation + angles.second;
    const continuousMinuteAngle = this.cumulativeMinuteRotation + angles.minute;
    const continuousHourAngle = this.cumulativeHourRotation + angles.hour;

    this.updateHand(this.hourHand, continuousHourAngle);
    this.updateHand(this.minuteHand, continuousMinuteAngle);
    this.updateHand(this.secondHand, continuousSecondAngle);
    this.previousSecond = seconds;
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
