// ORIZON v2.0 - Theme System(Dark/Light Modes)

class ThemeableClock {
  constructor() {
    this.isInitialized = false;
    this.clockUpdateInterval = null;
    this.dateUpdateInterval = null;
    this.digitalVisible = false;
    this.settingsVisible = false;
    this.currentTheme = "dark";
    this.autoTheme = false;
    this.smoothTransitions = true;
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
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        this.quickThemeToggle();
      });
    }
    const settingsToggle = document.getElementById("settingsToggle");
    if (settingsToggle) {
      settingsToggle.addEventListener("click", () => {
        this.toggleSettings();
      });
    }
    const closeSettings = document.getElementById("closeSettings");
    if (closeSettings) {
      closeSettings.addEventListener("click", () => {
        this.toggleSettings();
      });
    }
    const themeOptions = document.querySelectorAll(".theme-option");
    themeOptions.forEach((option) => {
      option.addEventListener("click", () => {
        const theme = option.dataset.theme;
        this.changeTheme(theme);
      });
    });
    const autoThemeCheckbox = document.getElementById("autoTheme");
    if (autoThemeCheckbox) {
      autoThemeCheckbox.addEventListener("change", (e) => {
        this.autoTheme = e.target.checked;
        this.saveThemePreferences();
        if (this.autoTheme) {
          this.updateAutoTheme();
        }
      });
    }
    const smoothTransitionsCheckbox =
      document.getElementById("smoothTransitions");
    if (smoothTransitionsCheckbox) {
      smoothTransitionsCheckbox.addEventListener("change", (e) => {
        this.smoothTransitions = e.target.checked;
        this.saveThemePreferences();
        this.updateTransitionSettings();
      });
    }
    const sidebarToggle = document.getElementById("sidebarToggle");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", () => {
        document.getElementById("sidebarArea").classList.toggle("is-open");
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "d" || e.key.toLowerCase() === "ड") {
        e.preventDefault();
        this.toggleDigitalDisplay();
      } else if (e.key.toLowerCase() === "t" || e.key.toLowerCase() === "ट") {
        e.preventDefault();
        this.quickThemeToggle();
      } else if (e.key.toLowerCase() === "s" || e.key.toLowerCase() === "स") {
        e.preventDefault();
        this.toggleSettings();
      } else if (e.key === "Escape") {
        if (this.settingsVisible) {
          this.toggleSettings();
        }
      }
    });
    console.log("🎛️ Theme system controls initialized");
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
      }
    } catch (error) {
      console.warn("Could not load theme preferences:", error);
    }
  }

  saveThemePreferences() {
    try {
      const prefs = {
        theme: this.currentTheme,
        autoTheme: this.autoTheme,
        smoothTransitions: this.smoothTransitions,
        digitalVisible: this.digitalVisible,
      };
      localStorage.setItem("orizon-theme-preferences", JSON.stringify(prefs));
    } catch (error) {
      console.warn("Could not save theme preferences:", error);
    }
  }

  applyTheme(themeName) {
    document.documentElement.setAttribute("data-theme", themeName);
    this.currentTheme = themeName;
    document.querySelectorAll(".theme-option").forEach((option) => {
      option.classList.toggle("active", option.dataset.theme === themeName);
    });
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
      const themeIcons = {
        dark: "🌙",
        light: "☀️",
        midnight: "🌃",
        sunset: "🌅",
      };
      const themeIcon = themeToggle.querySelector(".btn-icon");
      if (themeIcon) {
        themeIcon.textContent = themeIcons[themeName] || "🌓";
      }
    }
    this.saveThemePreferences();
    console.log(`🎨 Theme changed to: ${themeName}`);
  }

  changeTheme(themeName) {
    if (this.currentTheme === themeName) return;
    this.applyTheme(themeName);
    this.triggerThemeChangeAnimation();
  }

  quickThemeToggle() {
    const themes = ["dark", "light", "midnight", "sunset"];
    const currentIndex = themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    this.changeTheme(themes[nextIndex]);
  }

  triggerThemeChangeAnimation() {
    const container = document.querySelector(".clock-container");
    if (container) {
      container.style.animation = "none";
      setTimeout(() => {}, 10);
      setTimeout(() => {
        container.style.animation = "";
      }, 600);
    }
  }

  setupAutoTheme() {
    if (this.autoTheme) {
      this.updateAutoTheme();
      setInterval(() => {
        if (this.autoTheme) {
          this.updateAutoTheme();
        }
      }, 3600000);
    }

    const autoThemeCheckbox = document.getElementById("autoTheme");
    const smoothTransitionsCheckbox =
      document.getElementById("smoothTransitions");
    if (autoThemeCheckbox) {
      autoThemeCheckbox.checked = this.autoTheme;
    }
    if (smoothTransitionsCheckbox) {
      smoothTransitionsCheckbox.checked = this.smoothTransitions;
    }
    this.updateTransitionSettings();
  }

  updateAutoTheme() {
    if (!this.autoTheme) return;
    const hour = new Date().getHours();
    let autoTheme;
    if (hour >= 6 && hour < 12) {
      autoTheme = "light";
    } else if (hour >= 12 && hour < 18) {
      autoTheme = "sunset";
    } else if (hour >= 18 && hour < 22) {
      autoTheme = "sunset";
    } else {
      autoTheme = "midnight";
    }

    if (this.currentTheme !== autoTheme) {
      this.changeTheme(autoTheme);
      console.log(`🕐 Auto theme changed to ${autoTheme} based on time`);
    }
  }

  updateTransitionSettings() {
    if (this.smoothTransitions) {
      document.documentElement.style.removeProperty("--theme-transition");
    } else {
      document.documentElement.style.setProperty("--theme-transition", "none");
    }
  }

  toggleSettings() {
    const settingsPanel = document.getElementById("settingsPanel");
    const settingsToggle = document.getElementById("settingsToggle");
    const sidebarArea = document.getElementById("sidebarArea");
    if (!settingsPanel || !settingsToggle) return;
    this.settingsVisible = !this.settingsVisible;

    sidebarArea.classList.add("is-open");

    if (this.settingsVisible) {
      settingsPanel.classList.add("show");
      settingsToggle.classList.add("active");
      settingsToggle.querySelector(".btn-text").textContent = "Close";
      console.log("⚙️ Settings panel shown");
    } else {
      settingsPanel.classList.remove("show");
      settingsToggle.classList.remove("active");
      settingsToggle.querySelector(".btn-text").textContent = "Settings";
      console.log("⚙️ Settings panel hidden");
    }
  }

  setupIntervals() {
    this.clockUpdateInterval = setInterval(() => {
      this.updateClock();
      if (this.autoTheme && new Date().getSeconds() === 0) {
        this.updateAutoTheme();
      }
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
    if (this.digitalVisible) {
      setTimeout(() => {
        this.toggleDigitalDisplay();
      }, 100);
    }
    console.log("🕐 ORIZON v2.0 - Theme System Initialized");
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
      if (seconds === 0) {
        secondHand.style.transition = "none";
      } else {
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
    const themeEmojis = {
      dark: "🌙",
      light: "☀️",
      midnight: "🌃",
      sunset: "🌅",
    };
    const themeIcon = themeEmojis[this.currentTheme] || "🌓";
    document.title = `${modeIcon} ${timeString} ${themeIcon} - ORIZON v2.0`;
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
      console.log("📟 Digital display shown");
    } else {
      digitalDisplay.classList.remove("show");
      digitalToggle.classList.remove("active");
      digitalToggle.querySelector(".btn-text").textContent = "Digital";
      console.log("📟 Digital display hidden");
    }
    this.saveThemePreferences();
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
        segment.style.background = "var(--accent-color)";
        segment.style.backgroundOpacity = "0.2";
        segment.style.borderColor = "var(--accent-color)";
      });
      segment.addEventListener("mouseleave", () => {
        segment.style.background = "var(--bg-secondary)";
        segment.style.borderColor = "var(--border-glass)";
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

  setupMarkerEffects() {}

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
    console.log("🕐 ORIZON v2.0 - Clock destroyed");
  }
}

const themeAnimations = `
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
}

@keyframes themeChange {
    0% { 
        opacity: 1;
        transform: translateY(0) scale(1);
    }
    50% {
        opacity: 0.8;
        transform: translateY(-5px) scale(1.02);
    }
    100% { 
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}`;

const style = document.createElement("style");
style.textContent = themeAnimations;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", () => {
  const clock = new ThemeableClock();

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
  "%c🕐 ORIZON v2.0 ",
  "background: linear-gradient(45deg, #667eea, #764ba2); color: white; padding: 8px 16px; border-radius: 8px; font-weight: bold;"
);
console.log(
  "%c🌓 Theme System Loaded ✨",
  "color: #9c27b0; font-weight: bold;"
);
console.log(
  "%c📟 Digital Display Feature Available",
  "color: #00e676; font-weight: bold;"
);
console.log(
  "%c💡 Keyboard shortcuts: D=Digital, T=Theme, S=Settings, Esc=Close",
  "color: #ff6b6b; font-style: italic;"
);
console.log(
  "%c🎯 All v1.2 features preserved + theme system",
  "color: #00d4ff; font-weight: bold;"
);
console.log(
  "%c💾 Theme preferences saved in localStorage",
  "color: #feca57; font-weight: bold;"
);
