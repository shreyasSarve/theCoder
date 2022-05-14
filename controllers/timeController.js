const getIndianTime = function (time) {
  let date = {
    year: parseInt(time.slice(0, 4)),
    month: parseInt(time.slice(5, 7)),
    day: parseInt(time.slice(8, 10)),
  };

  let clock = {
    hour: parseInt(time.slice(11, 13)),
    minutes: parseInt(time.slice(14, 16)),
    seconds: parseInt(time.slice(17, 19)),
  };

  clock["minutes"] += 30;
  if (clock.minutes >= 60) {
    clock.hour += 1;
    clock.minutes %= 60;
    clock.hour += 5;
    if (clock.hour >= 24) {
      date.day += 1;
      clock.hour = 0;
      if (date.day > 30) {
        date.month += 1;
        date.day = 1;
        if (date.month > 12) {
          date.month = 1;
          date.year += 1;
        }
      }
    }
  }
  let finalTime =
    clock.hour.toString() +
    ":" +
    clock.minutes.toString().padStart(2, 0) +
    ":" +
    clock.seconds.toString().padStart(2, 0);

  let finlaDate =
    date.day.toString().padStart(2, 0) +
    "-" +
    date.month.toString().padStart(2, 0) +
    "-" +
    date.year.toString();

  return {
    date: finlaDate,
    time: finalTime,
  };
};

const timeConvertor = function (duration) {
  let dur = {
    hour: parseInt(duration / 3600)
      .toString()
      .padStart(2, 0),
    minutes: ((duration % 3600) / 60).toString().padStart(2, 0),
  };
  console.log(dur);
  return dur;
};
module.exports = {
  getIndianTime,
  timeConvertor,
};
