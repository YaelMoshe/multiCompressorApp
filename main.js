const CSV = require("./enteties/csv.js");
var Logger = require('./utils/logger.js');
var logger = new Logger().getInstance();
logger.debug("entering main.js file");

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow
const path = require("path");
const url = require("url");

let win;

/// creating browser window
function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true
    }
  })

  logger.info("new window is created");
  win.loadURL(url.format({
    pathname: path.join(__dirname, "index.html"),
    protocol: "file",
    slashes: "true"
  }));

  win.webContents.openDevTools();
  win.on("closed", () => {
    win = null;
  });
}

app.on('ready', createWindow);

/// only for mac
app.on("window-all-closed", () => {
  if (process.platform != 'darwin') {
    app.quit()
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow()
  }
});

/// ********** ///

function run_compress() {
  var user_path = document.getElementById("path").value;
  var compress_file = new CSV(user_path);
  compress_file.compress();
}

function run_decompress() {
  var user_path = document.getElementById("depath").value;
  var decompress_file = new CSV(user_path);
  decompress_file.decompress();
}

