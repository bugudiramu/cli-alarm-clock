class Alarm {
  constructor(
    time,
    daysOfWeek,
    description = "",
    snoozeDuration = 5,
    snoozeLimit = 3
  ) {
    this.time = time;
    this.daysOfWeek = daysOfWeek;
    this.description = description;
    this.snoozeCount = 0;
    this.snoozeDuration = snoozeDuration;
    this.snoozeLimit = snoozeLimit;
  }

  shouldAlert(currentTime) {
    const currentDate = currentTime.toDate();
    const dayMatches = this.daysOfWeek.includes(currentDate.getDay());
    const timeMatches =
      currentTime.hour === this.time.hour &&
      currentTime.minute === this.time.minute &&
      currentTime.second === this.time.second;
    return dayMatches && timeMatches;
  }

  snooze() {
    if (this.snoozeCount < this.snoozeLimit) {
      this.time = this.time.addMinutes(this.snoozeDuration);
      this.snoozeCount++;
    } else {
      console.log("Snooze limit reached.");
    }
  }

  toString() {
    return `${
      this.description
    } - Time: ${this.time.toString()}, Days: ${this.daysOfWeek.join(
      ", "
    )}, Snoozes: ${this.snoozeCount}`;
  }
}

module.exports = Alarm;
