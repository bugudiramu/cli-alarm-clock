# CLI Alarm Clock

This is a command-line application for managing alarm clocks. It allows users to set multiple alarms, snooze alarms, and manage alarms.

## Features

1. **Display Current Time**: Continuously displays the current time updated every second.
2. **Add Alarms**: Users can add multiple alarms by specifying the time, days of the week, description, snooze duration, and snooze limit.
3. **Snooze Alarms**: Alarms can be snoozed up to a specified limit with a customizable duration.
4. **Delete Alarms**: Users can delete alarms by specifying the alarm index.
5. **List Alarms**: List all the alarms with their details.
6. **Persistence**: Alarms are saved to a file and loaded on application start, ensuring alarms persist between sessions.
7. **Input Validation**: Validates the format of time and days of the week.
8. **Logging**: Logs important actions such as adding, deleting, and snoozing alarms.
9. **Time Zone Support**: Automatically detects and uses the user's time zone.
10. **Alarm Descriptions**: Each alarm can have a description for easy identification.
11. **Customizable Snooze**: Users can specify the snooze duration and snooze limit for each alarm.

## Classes and Object-Oriented Design

### AlarmClock

- **Properties**:
  - `alarms`: List of alarms.
  - `displayInterval`: Interval for updating the current time display.
  - `timezone`: User's time zone.

- **Methods**:
  - `start()`: Starts the alarm clock, displays current time, and checks alarms at regular intervals.
  - `displayTime()`: Displays the current time.
  - `checkAlarms()`: Checks and handles alarms that need to ring.
  - `addAlarm(time, daysOfWeek, description, snoozeDuration, snoozeLimit)`: Adds a new alarm.
  - `deleteAlarm(index)`: Deletes an alarm by index.
  - `listAlarms()`: Lists all alarms.
  - `saveAlarms()`: Saves alarms to a file.
  - `loadAlarms()`: Loads alarms from a file.

### Time

- **Properties**:
  - `hour`: Hour of the time.
  - `minute`: Minute of the time.
  - `second`: Second of the time.

- **Methods**:
  - `static now(timezone)`: Returns the current time in the specified timezone.
  - `toDate()`: Converts the Time object to a JavaScript Date object.
  - `toString()`: Returns the time as a string in HH:MM:SS format.
  - `addMinutes(minutes)`: Adds minutes to the time.
  - `static isValidTime(time)`: Validates a Time object.

### Alarm

- **Properties**:
  - `time`: Time of the alarm.
  - `daysOfWeek`: Days of the week the alarm should ring.
  - `description`: Description of the alarm.
  - `snoozeCount`: Number of times the alarm has been snoozed.
  - `snoozeDuration`: Duration of each snooze.
  - `snoozeLimit`: Maximum number of snoozes allowed.

- **Methods**:
  - `shouldAlert(currentTime)`: Checks if the alarm should ring at the current time.
  - `snooze()`: Snoozes the alarm.
  - `toString()`: Returns the alarm details as a string.

## Usage

### Starting the Alarm Clock

```javascript
const ac = new AlarmClock();
ac.start();
```

### Adding an Alarm

```javascript
ac.addAlarm(new Time(9, 0, 0), [2], "Morning Meeting", 5, 3);
```

### Deleting an Alarm

```javascript
ac.deleteAlarm(0);
```

### Listing Alarms

```javascript
ac.listAlarms();
```

### Running the CLI

To run the CLI application, create a `cli.js` file with the following content and execute it:

```javascript
const readline = require('readline');
const AlarmClock = require('./alarmClock');
const Time = require('./time');

const ac = new AlarmClock();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayMenu() {
  console.log("\nAlarm Clock Menu:");
  console.log("1. Add Alarm");
  console.log("2. Delete Alarm");
  console.log("3. List Alarms");
  console.log("4. Quit");
}

function handleUserInput() {
  displayMenu();
  rl.question('Choose an option: ', (option) => {
    switch (option) {
      case '1':
        rl.question('Enter time (HH:MM:SS): ', (timeInput) => {
          const [hour, minute, second] = timeInput.split(':').map(Number);
          rl.question('Enter days of the week (comma separated, e.g., 1,2,3 for Mon, Tue, Wed): ', (daysInput) => {
            const daysOfWeek = daysInput.split(',').map(Number);
            rl.question('Enter description: ', (description) => {
              rl.question('Enter snooze duration (minutes): ', (snoozeDuration) => {
                rl.question('Enter snooze limit: ', (snoozeLimit) => {
                  ac.addAlarm(new Time(hour, minute, second), daysOfWeek, description, parseInt(snoozeDuration), parseInt(snoozeLimit));
                  console.log('Alarm added.');
                  handleUserInput();
                });
              });
            });
          });
        });
        break;
      case '2':
        ac.listAlarms();
        rl.question('Enter the index of the alarm to delete: ', (index) => {
          ac.deleteAlarm(Number(index));
          console.log('Alarm deleted.');
          handleUserInput();
        });
        break;
      case '3':
        ac.listAlarms();
        handleUserInput();
        break;
      case '4':
        rl.close();
        break;
      default:
        console.log('Invalid option.');
        handleUserInput();
        break;
    }
  });
}

ac.start();
handleUserInput();
```

## Installation

1. Clone the repository.
2. Run `npm install` to install the required dependencies (`moment-timezone`).
3. Run `node cli.js` to start the application.# cli-alarm-clock
