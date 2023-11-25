import FlipDot from 'flipdot-display';
import fontList from './fontlist';

const PORT = 'COM3';
const ADDRESS = 1;
const HEIGHT = 16;
const WIDTH = 96;

const flippy = new FlipDot(PORT, ADDRESS, HEIGHT, WIDTH);

const cycleThroughFonts = () => {
  let fontIndex = 0;

  const cycle = setInterval(() => {
    console.log('prepping font ', fontList[fontIndex]);
    showNewFont(fontList[fontIndex]);
    fontIndex += 1;
  }, 5000);
};

const showNewFont = (fontName) => {
  console.log(`up next: ${fontName}`);
  flippy.writeText('Hello World!', {
    font: fontName,
    width: WIDTH
  });
  flippy.send();
};

flippy.once('open', function () {
  cycleThroughFonts();
});
