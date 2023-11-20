import FlipDot from 'flipdot-display';

const PORT = 'COM3';
const ADDRESS = 1;
const HEIGHT = 16;
const WIDTH = 96;

const flippy = new FlipDot(PORT, ADDRESS, HEIGHT, WIDTH);


flippy.once('open', function () {
  flippy.writeText('Hello World!');
  flippy.send();
});
