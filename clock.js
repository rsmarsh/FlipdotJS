import FlipDot from 'flipdot-display';
import dateFormat from 'dateformat';

var flippy = new FlipDot('COM3', 1, 16, 96);

function startClock(
  seconds = false,
  font = 'Banner',
  offset = [0, 0],
  invert = false
) {
  var format = 'ddd mmm HH:MM';
  if (seconds) {
    format = format.concat(':ss');
  }

  var lastString = [];
  var task = setInterval(function () {
    var now = new Date();
    var timeString = dateFormat(now, format);
    if (timeString != lastString) {
      flippy.writeText(timeString, { font: font }, offset, invert);
      flippy.send();
      lastString = timeString;
    }
  }, 1000);

  return task;
}

let interval;

function stopClock(task) {
  clearInterval(task);
}

flippy.on('error', function (err) {
  console.log(err);
  stopClock(interval);
});

flippy.once('open', function () {
  flippy.fill(0xff);

  interval = startClock(true);
});
