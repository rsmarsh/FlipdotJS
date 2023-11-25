import FlipDot from 'flipdot-display';

console.log(process.title);
const PORT = process.PORT;
const ADDRESS = process.ADDRESS;
const ROWS = process.ROWS;
const COLUMNS = process.COLUMNS;

const flippy = new FlipDot(PORT, ADDRESS, ROWS, COLUMNS);


flippy.once('open', function () {
  console.log(flippy.writeText(' Hello World!', {font: 'Banner', width: COLUMNS, printDirection: 0}));
  
  flippy.send();
});

flippy.once('error', function (err) {
  console.log("error")
})
