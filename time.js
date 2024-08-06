const moment = require("moment-timezone");

class Time {
  constructor(hour, minute, second) {
    this.hour = hour;
    this.minute = minute;
    this.second = second;
  }

  static now(timezone) {
    const now = moment.tz(timezone);
    const hour = now.hours();
    const minute = now.minutes();
    const second = now.seconds();
    return new Time(hour, minute, second);
  }

  toDate() {
    const date = new Date();
    date.setHours(this.hour);
    date.setMinutes(this.minute);
    date.setSeconds(this.second);
    return date;
  }

  toString() {
    return `${this.hour.toString().padStart(2, "0")}:${this.minute
      .toString()
      .padStart(2, "0")}:${this.second.toString().padStart(2, "0")}`;
  }

  addMinutes(minutes) {
    const date = this.toDate();
    date.setMinutes(date.getMinutes() + minutes);
    return new Time(date.getHours(), date.getMinutes(), date.getSeconds());
  }

  static isValidTime(time) {
    return (
      time instanceof Time &&
      time.hour >= 0 &&
      time.hour < 24 &&
      time.minute >= 0 &&
      time.minute < 60 &&
      time.second >= 0 &&
      time.second < 60
    );
  }
}

module.exports = Time;
