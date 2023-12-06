import FlipDot from 'flipdot-display';
import matrix from './raw_matrix/acorn_bus.js';

// TODO: move to .env file
const PORT = 'COM3';
const ADDRESS = 1;
const ROWS = 16;
const COLUMNS = 96;

const flippy = new FlipDot(PORT, ADDRESS, ROWS, COLUMNS);

flippy.once('open', function () {
  const bytes = flippy.matrixToBytes(matrix);

  flippy.send(bytes, () => {
    console.log('complete, closing');
    flippy.close();
  });
});
