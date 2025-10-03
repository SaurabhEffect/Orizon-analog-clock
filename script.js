// ORIZON v1.2 - Added Digital Display Toggle

class DigitalClock {
  constructor() {
    this.isInitialized = false;
    this.clockUpdateInterval = null;
    this.dateUpdateInterval = null;
    this.digitalVisible = false;
    this.init();
  }

  init() {
    this.updateClock();
    this.updateDate();

    setTimeout(() => {
      this.setupIntervals();
      this.setupEnhancements();
      this.setupEventListeners();
      this.isInitialized = true;
    }, 500);
  }

  setupEventListeners() {
    const digitalToggle = document.getElementById("digitalToggle");
    if (digitalToggle) {
      digitalToggle.addEventListener("click", () => {
        this.toggleDigitalDisplay();
      });
    }
    document.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "d" || e.key.toLowerCase() === "ड") {
        e.preventDefault();
        this.toggleDigitalDisplay();
      }
    });

    console.log("🎛️ Digital display controls initialized");
  }

  setupIntervals() {
    this.clockUpdateInterval = setInterval(() => {
      this.updateClock();
    }, 1000);

    this.dateUpdateInterval = setInterval(() => {
      this.updateDate();
    }, 60000);
  }

  setupEnhancements() {
    const clockFace = document.querySelector(".clock-face");
    if (clockFace) {
      this.setupClockInteraction(clockFace);
    }

    this.setupMarkerEffects();
    this.setupDigitalInteractions();
    this.setupPerformanceOptimization();

    console.log("🕐 ORIZON v1.2 - Digital Clock Initialized");
  }

  updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    this.updateAnalogClock(hours, minutes, seconds, milliseconds);
    this.updateDigitalClock(hours, minutes, seconds);
    this.updatePageTitle(hours, minutes, seconds);
  }

  updateAnalogClock(hours, minutes, seconds, milliseconds) {
    const hourAngle = (hours % 12) * 30 + minutes * 0.5 + seconds * (0.5 / 60);
    const minuteAngle = minutes * 6 + seconds * 0.1;
    const secondAngle = seconds * 6 + milliseconds * 0.006;
    const secondHand = document.getElementById("secondHand");
    if (secondHand) {
      // Jab seconds 0 ho (sui 12 par ho), tab transition hata do
      if (seconds === 0) {
        secondHand.style.transition = "none";
      }
      // Baaki time transition waapis laga do
      else {
        secondHand.style.transition = "transform 0.1s ease-out";
      }
    }

    this.updateHand("hourHand", hourAngle);
    this.updateHand("minuteHand", minuteAngle);
    this.updateHand("secondHand", secondAngle);
  }

  updateDigitalClock(hours, minutes, seconds) {
    const timeHours = document.querySelector(".time-hours");
    const timeMinutes = document.querySelector(".time-minutes");
    const timeSeconds = document.querySelector(".time-seconds");
    const timePeriod = document.querySelector(".time-period");

    if (timeHours && timeMinutes && timeSeconds && timePeriod) {
      const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
      const period = hours >= 12 ? "PM" : "AM";

      this.updateDigitalElement(
        timeHours,
        displayHours.toString().padStart(2, "0")
      );
      this.updateDigitalElement(
        timeMinutes,
        minutes.toString().padStart(2, "0")
      );
      this.updateDigitalElement(
        timeSeconds,
        seconds.toString().padStart(2, "0")
      );
      this.updateDigitalElement(timePeriod, period);
    }
  }

  updateDigitalElement(element, newValue) {
    if (element && element.textContent !== newValue) {
      element.style.transform = "scale(1.1)";
      element.style.color = "var(--accent-color)";

      setTimeout(() => {
        element.textContent = newValue;
        element.style.transform = "scale(1)";
        element.style.color = "var(--text-primary)";
      }, 150);
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
    const now = new Date();
    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const timeOptions = {
      weekday: "long",
    };

    const formattedDate = now.toLocaleDateString("en-US", dateOptions);
    const dayName = now.toLocaleDateString("en-US", timeOptions);
    this.updateDateDisplay(formattedDate, dayName);
  }

  updateDateDisplay(dateText, dayText) {
    const dateElement = document.querySelector(".date-text");
    const dayElement = document.querySelector(".day-text");

    if (dateElement && dayElement) {
      dateElement.style.opacity = "0.7";
      dayElement.style.opacity = "0.7";

      setTimeout(() => {
        dateElement.textContent = dateText;
        dayElement.textContent = `Today is ${dayText}`;
        dateElement.style.opacity = "1";
        dayElement.style.opacity = "1";
      }, 150);
    }
  }

  updatePageTitle(hours, minutes, seconds) {
    const timeString = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    const modeIcon = this.digitalVisible ? "📟" : "🕐";
    document.title = `${modeIcon} ${timeString} - ORIZON v1.2`;
  }
  toggleDigitalDisplay() {
    const digitalDisplay = document.getElementById("digitalDisplay");
    const digitalToggle = document.getElementById("digitalToggle");
    if (!digitalDisplay || !digitalToggle) return;
    this.digitalVisible = !this.digitalVisible;

    if (this.digitalVisible) {
      digitalDisplay.classList.add("show");
      digitalToggle.classList.add("active");
      digitalToggle.innerHTML =
        '<span class="btn-icon">📟</span><span class="btn-text">Hide Digital</span>';
      this.triggerDigitalEntrance();

      console.log("📟 Digital display shown");
    } else {
      digitalDisplay.classList.remove("show");
      digitalToggle.classList.remove("active");
      digitalToggle.innerHTML =
        '<span class="btn-icon">📟</span><span class="btn-text">Digital</span>';
      console.log("📟 Digital display hidden");
    }
    this.updatePageTitle(
      new Date().getHours(),
      new Date().getMinutes(),
      new Date().getSeconds()
    );
  }

  triggerDigitalEntrance() {
    const digitalTime = document.querySelector(".digital-time");
    if (digitalTime) {
      digitalTime.style.animation = "none";
      setTimeout(() => {
        digitalTime.style.animation = "digitalEntrance 0.8s ease";
      }, 10);
      setTimeout(() => {
        digitalTime.style.animation = "";
      }, 800);
    }
  }

  setupDigitalInteractions() {
    const timeSegments = document.querySelectorAll(
      ".time-hours, .time-minutes, .time-seconds"
    );
    timeSegments.forEach((segment) => {
      segment.addEventListener("mouseenter", () => {
        segment.style.background = "rgba(0, 212, 255, 0.2)";
        segment.style.borderColor = "var(--accent-color)";
      });

      segment.addEventListener("mouseleave", () => {
        segment.style.background = "rgba(255, 255, 255, 0.1)";
        segment.style.borderColor = "rgba(255, 255, 255, 0.2)";
      });

      segment.addEventListener("click", () => {
        this.triggerSegmentPulse(segment);
      });
    });

    const timePeriod = document.querySelector(".time-period");
    if (timePeriod) {
      timePeriod.addEventListener("click", () => {
        this.triggerPeriodAnimation();
      });
    }
  }

  triggerSegmentPulse(segment) {
    segment.style.transform = "scale(1.2)";
    segment.style.color = "var(--accent-color)";

    setTimeout(() => {
      segment.style.transform = "scale(1)";
      segment.style.color = "var(--text-primary)";
    }, 200);
  }

  triggerPeriodAnimation() {
    const timePeriod = document.querySelector(".time-period");
    if (timePeriod) {
      timePeriod.style.animation = "none";
      setTimeout(() => {
        timePeriod.style.animation = "periodFlip 0.6s ease";
      }, 10);

      setTimeout(() => {
        timePeriod.style.animation =
          "periodGlow 3s ease-in-out infinite alternate";
      }, 600);
    }
  }

  setupClockInteraction(clockFace) {
    clockFace.addEventListener("mouseenter", () => {
      clockFace.style.transform = "scale(1.02)";
    });
    clockFace.addEventListener("mouseleave", () => {
      clockFace.style.transform = "scale(1)";
    });
    clockFace.addEventListener("click", () => {
      this.triggerClockPulse();
    });
  }

  triggerClockPulse() {
    const clockFace = document.querySelector(".clock-face");
    if (clockFace) {
      clockFace.style.animation = "none";
      setTimeout(() => {
        clockFace.style.animation = "clockPulse 0.6s ease";
      }, 10);

      setTimeout(() => {
        clockFace.style.animation = "";
      }, 600);
    }
  }

  setupMarkerEffects() {
    const markers = document.querySelectorAll(".marker");
    markers.forEach((marker, index) => {
      marker.style.animationDelay = `${index * 0.1}s`;
      marker.addEventListener("mouseenter", () => {
        marker.style.transform += " scale(1.1)";
        marker.style.zIndex = "10";
      });
      marker.addEventListener("mouseleave", () => {
        marker.style.transform = marker.style.transform.replace(
          " scale(1.1)",
          ""
        );
        marker.style.zIndex = "";
      });
    });
  }

  setupPerformanceOptimization() {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && this.clockUpdateInterval) {
            clearInterval(this.clockUpdateInterval);
            this.clockUpdateInterval = setInterval(() => {
              this.updateClock();
            }, 5000);
          } else if (entry.isIntersecting) {
            if (this.clockUpdateInterval) {
              clearInterval(this.clockUpdateInterval);
            }
            this.clockUpdateInterval = setInterval(() => {
              this.updateClock();
            }, 1000);
          }
        });
      });

      observer.observe(document.querySelector(".clock"));
    }
  }

  destroy() {
    if (this.clockUpdateInterval) {
      clearInterval(this.clockUpdateInterval);
    }
    if (this.dateUpdateInterval) {
      clearInterval(this.dateUpdateInterval);
    }
    console.log("🕐 ORIZON v1.2 - Clock destroyed");
  }
}

const digitalAnimations = `
        @keyframes digitalEntrance {
            0% { 
                opacity: 0;
                transform: translateY(-10px) scale(0.8);
            }
            50% {
                opacity: 0.7;
                transform: translateY(5px) scale(1.1);
            }
            100% { 
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        @keyframes periodFlip {
            0% { transform: rotateY(0deg); }
            50% { transform: rotateY(180deg) scale(1.2); }
            100% { transform: rotateY(360deg); }
        }

        @keyframes clockPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }`;

const style = document.createElement("style");
style.textContent = digitalAnimations;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", () => {
  const clock = new DigitalClock();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      console.log("🕐 Clock hidden - reducing updates");
    } else {
      console.log("🕐 Clock visible - resuming normal updates");
    }
  });

  window.addEventListener("beforeunload", () => {
    clock.destroy();
  });
});

console.log(
  "%c🕐 ORIZON v1.2 ",
  "background: linear-gradient(45deg, #667eea, #764ba2); color: white; padding: 8px 16px; border-radius: 8px; font-weight: bold;"
);
console.log(
  "%c📟 Digital Display Feature Loaded ✨",
  "color: #00e676; font-weight: bold;"
);
console.log(
  '%c💡 Press "D" key to toggle digital display',
  "color: #ff6b6b; font-style: italic;"
);
console.log(
  "%c🎯 All v1.1 features preserved + digital enhancements",
  "color: #00d4ff; font-weight: bold;"
);
