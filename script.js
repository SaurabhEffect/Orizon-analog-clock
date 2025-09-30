// Verion 1.0

class BasicClock {
  constructor() {
    this.init();
  }

  init() {
    this.updateClock();
    this.updateDate();

    setInterval(() => {
      this.updateClock();
    }, 1000);

    setInterval(() => {
      this.updateDate();
    }, 60000);
  }

  updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourAngle = (hours % 12) * 30 + minutes * 0.5;
    const minuteAngle = minutes * 6 + seconds * 0.1;
    const secondAngle = seconds * 6;

    document.getElementById(
      "hourHand"
    ).style.transform = `rotate(${hourAngle}deg)`;
    document.getElementById(
      "minuteHand"
    ).style.transform = `rotate(${minuteAngle}deg)`;
    document.getElementById(
      "secondHand"
    ).style.transform = `rotate(${secondAngle}deg)`;
  }

  updateDate() {
    const now = new Date();

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const dateText = now.toLocaleDateString("en-US", options);
    const dayText = now.toLocaleDateString("en-US", { weekday: "long" });

    document.querySelector(".date-text").textContent = dateText;
    document.querySelector(".day-text").textContent = `Today is ${dayText}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new BasicClock();
});
