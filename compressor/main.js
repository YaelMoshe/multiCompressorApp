const CSV = require("./enteties/csv.js");
var Logger = require('./utils/logger.js');
var logger = new Logger().getInstance();
console.log("main.js file");

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow
const path = require("path");
const url = require("url");

let win;

function createWindow() {
  win = new BrowserWindow();
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

// only for mac
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

var test_compress_file = new CSV("./tests/example_files/csv/basic.csv", "sz");
test_compress_file.compress();

var test_decompress_file = new CSV("./tests/example_files/csv/basic_compressed.txt", "kk");
test_decompress_file.decompress();



