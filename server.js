const express = require("express");
const app = express();
const serverPort = 3000;
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const { insertMessage, queryMessageHistory } = require("./db.js");

const https = require("https");

const PORT = "/dev/ttyUSB0";
// const PORT = 'COM3';
const ADDRESS = 1;
const ROWS = 16;
const COLUMNS = 96;

const FlipDot = require("flipdot-display");
const flipdot = new FlipDot(PORT, ADDRESS, ROWS, COLUMNS);

app.get("/", (req, res) => {
  const options = {
    root: path.join(__dirname),
  };

  res.sendFile(`${options.root}/src/index.html`);
  console.log("A visitor appeared");
});

const options = {
  key: fs.readFileSync(process.env.KEY_LOCATION, "utf8"),
  cert: fs.readFileSync(process.env.CERT_LOCATION, "utf8"),
};

// Create HTTPs server.

var server = https.createServer(options, app);

app.use(express.json());
app.post("/text/", (req, res) => {
  const { message, font } = req.body;
  flipdot.writeText(message, {
    font: font,
    width: COLUMNS,
    printDirection: 0,
  });

  flipdot.send();
  res.send(`Sent "${req.params.message}" using "${font}" font`);

  // triggers a DB write with this message
  insertMessage(message, font);
});

// returns the message list history when requested
app.get("/history", async (req, res) => {
  const messageHistory = await queryMessageHistory();
  res.json(messageHistory);
});

server.listen(serverPort, () => {
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
