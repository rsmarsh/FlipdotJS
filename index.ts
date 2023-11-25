import FlipDot from 'flipdot-display';

// const PORT = process.env.PORT;
// const PORT = '/dev/ttyUSB0';
// const ADDRESS = process.env.ADDRESS;
// const ROWS = Number(process.env.ROWS);
// const COLUMNS = Number(process.env.COLUMNS);

// TODO: move to .env file
const PORT = 'COM3';
const ADDRESS = 1;
const ROWS = 16;
const COLUMNS = 96;

const flippy = new FlipDot(PORT, ADDRESS, ROWS, COLUMNS);

flippy.once('error', function (err: any) {
  console.log(err);
  console.log('an error occured');
});

flippy.once('close', function () {
  console.log('connection closed');
});

console.log(process.title);

flippy.once('open', function () {
  const dataSent = flippy.writeText('Hello World', {
    font: 'Banner',
    width: COLUMNS,
    printDirection: 0
  });
  flippy.send();
});
