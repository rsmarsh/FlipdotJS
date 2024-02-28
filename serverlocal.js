const express = require("express");
const app = express();
const cors = require('cors');
const serverPort = 3000;
const path = require("path");
const fs = require("fs");
require('dotenv').config();

const { insertMessage, queryMessageHistory } = require('./db.js');

const https = require("https");

const PORT = "/dev/ttyUSB0";
// const PORT = 'COM3'; // Windows USB port
const ADDRESS = 1;
const ROWS = 16;
const COLUMNS = 96;

const FlipDot = require("flipdot-display");
const flipdot = new FlipDot(PORT, ADDRESS, ROWS, COLUMNS);

let visitorCount = 0;

app.get("/", (req, res) => {
  const options = {
    root: path.join(__dirname),
  };


  res.sendFile(`${options.root}/src/index.html`);
  console.log(`Visitor ${visitorCount} appeared`)
  visitorCount += 1;
});

app.use(express.json());

var allowedOrigins = [
  'http://localhost:3000',
  'https://flipdot.isitnice.co.uk',
  'https://flipdot.richardmarshall.dev'
];

app.use(cors({
  origin: function(origin, callback){
    if(allowedOrigins.indexOf(origin) === -1 && origin !== undefined){
      console.log(origin)
      var msg = 'Not in CORS allow list';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.post("/text/", (req, res) => {
  const { message, font } = req.body;
  flipdot.writeText(message, {
    font: font,
    width: COLUMNS,
    printDirection: 0,
  });

  flipdot.send();
  res.send(`Displaying "${message}" using "${font}" font`);

  // triggers a DB write with this message
  insertMessage(message, font);
});

// returns the message list history when requested
app.get('/history', async (req, res) => {
  const messageHistory = await queryMessageHistory();
  res.json(messageHistory);
})

app.listen(serverPort, () => {
  console.log("https server listening");
});


flipdot.once("error", function (err) {
  console.log(err);
  console.log("an error occured");
});

flipdot.once("close", function () {
  console.log("connection closed");
});

flipdot.once("open", function () {
  const dataSent = flipdot.writeText("Hello", {
    font: "Banner",
    width: COLUMNS,
    printDirection: 0,
  });
  flipdot.send();
});

function saveFont(fontName, message) {
  fs.writeFile("file.txt", data, (err) => {
    if (err) {
      throw err;
    }

    console.log("Data has been written to file successfully.");
  });
}
