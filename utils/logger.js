var fs = require("fs");

var debug_flag = false;

class Logger {
  // create the log file
  constructor() {
    this.file_name = './logs/log_file.txt';

    fs.open(this.file_name, 'w', function (err, file) {
      if (err) throw err;
    });
  }

  /// creating message in logging format
  create_msg(msg, type) {
    const timestamp = new Date().toISOString();
    return timestamp + " | " + type + " | " + msg + "\n";
  }

  info(msg) {
    fs.appendFile(this.file_name, this.create_msg(msg, "INFO"), function (err) {
      if (err) {
        console.error("error - ", err, ", while writing message - ", msg, ", to log file ");
      }
    });     
  }

  err(msg) {
    fs.appendFile(this.file_name, this.create_msg(msg, "ERROR"), function (err) {
      if (err) {
        console.error("error - ", err, ", while writing message - ", msg, ", to log file ");
      }
    });    
  }

  debug(msg) {
    if (debug_flag == true) {
      fs.appendFile(this.file_name, this.create_msg(msg, "DEBUG"), function (err) {
        if (err) {
          console.error("error - ", err, ", while writing message - ", msg, ", to log file ");
        }
      });
    }
  }

}

/// logger is singleton
class Singleton {

  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = new Logger();
    }
  }

  getInstance() {
    return Singleton.instance;
  }
}

module.exports = Singleton;