// ORIZON Clock v3.2 - Time Utilities

class TimeUtils {
  static getCurrentTime(timezone = "local") {
    if (timezone === "local") {
      return new Date();
    }
    try {
      const localTime = new Date();
      const tzString = localTime.toLocaleString("en-US", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const [datePart, timePart] = tzString.split(", ");
      const [month, day, year] = datePart.split("/");
      const [hours, minutes, seconds] = timePart.split(":");

      return new Date(
        year,
        month - 1,
        day,
        hours,
        minutes,
        seconds,
        localTime.getMilliseconds()
      );
    } catch (error) {
      console.error("Timezone conversion error:", error);
      return new Date();
    }
  }

  static getTimezoneOffsetString(timezone = "local") {
    if (timezone === "local") {
      const offset = -new Date().getTimezoneOffset();
      const hours = Math.floor(Math.abs(offset) / 60);
      const minutes = Math.abs(offset) % 60;
      const sign = offset >= 0 ? "+" : "-";
      return `${sign}${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}`;
    }
    try {
      const now = new Date();
      const utcDate = new Date(
        now.toLocaleString("en-US", { timeZone: "UTC" })
      );
      const tzDate = new Date(
        now.toLocaleString("en-US", { timeZone: timezone })
      );
      const offsetMinutes = Math.round((tzDate - utcDate) / 60000);
      const hours = Math.floor(Math.abs(offsetMinutes) / 60);
      const minutes = Math.abs(offsetMinutes) % 60;
      const sign = offsetMinutes >= 0 ? "+" : "-";
      return `${sign}${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}`;
    } catch (error) {
      console.error("Offset calculation error:", error);
      return "+00:00";
    }
  }

  static calculateHandAngles(time) {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const milliseconds = time.getMilliseconds();

    return {
      hour: (hours % 12) * 30 + minutes * 0.5 + seconds * (0.5 / 60),
      minute: minutes * 6 + seconds * 0.1,
      second: seconds * 6 + milliseconds * 0.006,
    };
  }

  static formatDigitalTime(time, options = {}) {
    const {
      format12Hour = true,
      showSeconds = true,
      padZeros = true,
    } = options;

    let hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    let period = "";
    if (format12Hour) {
      period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
    }
    const formatNumber = (num) =>
      padZeros ? num.toString().padStart(2, "0") : num.toString();
    return {
      hours: formatNumber(hours),
      minutes: formatNumber(minutes),
      seconds: formatNumber(seconds),
      period,
      showSeconds,
    };
  }

  static formatDate(date, options = {}) {
    const {
      locale = "en-US",
      includeYear = true,
      includeWeekday = true,
    } = options;
    const dateOptions = {
      weekday: includeWeekday ? "long" : undefined,
      year: includeYear ? "numeric" : undefined,
      month: "long",
      day: "numeric",
    };
    const dayOptions = { weekday: "long" };
    return {
      fullDate: date.toLocaleDateString(locale, dateOptions),
      dayName: date.toLocaleDateString(locale, dayOptions),
      todayText: `Today is ${date.toLocaleDateString(locale, dayOptions)}`,
    };
  }

  static getTimezoneDisplayName(timezone) {
    if (timezone === "local") {
      return "Local Time";
    }
    return (
      timezone.replace("_", " ").replace("/", " - ").split("/")[1] || timezone
    );
  }

  static isNewSecond(currentSecond, previousSecond) {
    return currentSecond !== previousSecond;
  }
}
