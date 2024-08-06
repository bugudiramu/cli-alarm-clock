const fs = require("fs");
const moment = require("moment-timezone");
const Alarm = require("./alarm");
const Time = require("./time");

class AlarmClock {
  constructor() {
    this.alarms = this.loadAlarms();
    this.displayInterval = 1000; // Every second
    this.timezone = moment.tz.guess(); // Detect the user's timezone
    this.intervalId = null;
  }

  start() {
    this.displayTime();
    this.intervalId = setInterval(() => {
      this.checkAlarms();
      this.displayTime();
    }, this.displayInterval);
  }
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  displayTime() {
    const currentTime = Time.now(this.timezone);
    console.log(currentTime.toString());
  }

  checkAlarms() {
    const currentTime = Time.now(this.timezone);
    this.alarms.forEach((alarm, index) => {
      if (alarm.shouldAlert(currentTime)) {
        if (alarm.snoozeCount < alarm.snoozeLimit) {
          console.log(`Alarm ringing: ${alarm.description}`);
          alarm.snooze();
        } else {
          console.log(`Alarm! (Snooze limit reached): ${alarm.description}`);
          this.deleteAlarm(index);
        }
      }
    });
    this.saveAlarms();
  }

  addAlarm(
    time,
    daysOfWeek,
    description = "",
    snoozeDuration = 5,
    snoozeLimit = 3
  ) {
    if (!Time.isValidTime(time)) {
      console.error("Invalid time format. Please use HH:MM:SS.");
      return;
    }

    if (
      !Array.isArray(daysOfWeek) ||
      daysOfWeek.some((day) => day < 0 || day > 6)
    ) {
      console.error(
        "Invalid days of the week. Please use values 0-6 for Sunday-Saturday."
      );
      return;
    }

    const alarm = new Alarm(
      time,
      daysOfWeek,
      description,
      snoozeDuration,
      snoozeLimit
    );
    this.alarms.push(alarm);
    this.saveAlarms();
    console.log(`Alarm added: ${description}`);
  }

  deleteAlarm(index) {
    if (index < 0 || index >= this.alarms.length) {
      console.error("Invalid alarm index.");
      return;
    }
    console.log(`Alarm deleted: ${this.alarms[index].description}`);
    this.alarms.splice(index, 1);
    this.saveAlarms();
  }

  listAlarms() {
    this.alarms.forEach((alarm, index) => {
      console.log(`${index}: ${alarm.toString()}`);
    });
  }

  saveAlarms() {
    fs.writeFileSync("alarms.json", JSON.stringify(this.alarms, null, 2));
  }

  loadAlarms() {
    if (fs.existsSync("alarms.json")) {
      const data = fs.readFileSync("alarms.json");
      const alarms = JSON.parse(data);
      return alarms.map(
        (alarm) =>
          new Alarm(
            new Time(alarm.time.hour, alarm.time.minute, alarm.time.second),
            alarm.daysOfWeek,
            alarm.description,
            alarm.snoozeDuration,
            alarm.snoozeLimit
          )
      );
    }
    return [];
  }
}

const ac = new AlarmClock();
ac.start();
// Add alarm on Tue (day-2) 9AM
ac.addAlarm(new Time(9, 0, 0), [2], "Morning Meeting", 5, 3);
// Add alarm on Tue (day-2) 3:25 PM
ac.addAlarm(new Time(15, 25, 0), [2], "Afternoon Meeting", 5, 3);
ac.listAlarms();

module.exports = AlarmClock;
