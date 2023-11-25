import FlipDot from 'flipdot-display';

const PORT = '/dev/ttyUSB0';
const ADDRESS = 1;
const HEIGHT = 16;
const WIDTH = 96;

const flippy = new FlipDot(PORT, ADDRESS, HEIGHT, WIDTH);


flippy.once('open', function () {
  console.log("flipdot open")
  flippy.writeText('Hello World!');
  flippy.send();
  flippy.close();
});

flippy.once('error', function(err: any) {
  console.log(err)
  console.log("an error")
})


flippy.once('close', function() {
  console.log("closed")
})
