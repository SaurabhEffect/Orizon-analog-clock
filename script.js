// Orizon v1.1 - Enhanced Analog Clock

class EnhancedClock {
  constructor() {
    this.isInitialized = false;
    this.clockUpdateInterval = null;
    this.dateUpdateInterval = null;
    this.init();
  }

  init() {
    this.updateClock();
    this.updateDate();

    setTimeout(() => {
      this.setupIntervals();
      this.setupEnhancements();
      this.isInitialized = true;
    }, 500);
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

    this.setupPerformanceOptimization();

    console.log("🕐 CHRONOS v1.1 - Enhanced Clock Initialized");
  }

  updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    const hourAngle = (hours % 12) * 30 + minutes * 0.5 + seconds * (0.5 / 60);
    const minuteAngle = minutes * 6 + seconds * 0.1;
    const secondAngle = seconds * 6 + milliseconds * 0.006;

    this.updateHand("hourHand", hourAngle);
    this.updateHand("minuteHand", minuteAngle);
    this.updateHand("secondHand", secondAngle);

    this.updatePageTitle(hours, minutes, seconds);
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
    document.title = `🕐 ${timeString} - Orizon v1.1`;
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
    console.log("🕐 Orizon v1.1 - Clock destroyed");
  }
}

const pulseAnimation = `
@keyframes clockPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}`;

const style = document.createElement("style");
style.textContent = pulseAnimation;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", () => {
  const clock = new EnhancedClock();

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
  "%c🕐 Orizon v1.1 ",
  "background: linear-gradient(45deg, #667eea, #764ba2); color: white; padding: 8px 16px; border-radius: 8px; font-weight: bold;"
);
console.log(
  "%cEnhanced Glassmorphism Styling Loaded ✨",
  "color: #00d4ff; font-weight: bold;"
);
