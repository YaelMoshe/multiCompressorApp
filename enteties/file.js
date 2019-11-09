const legend = require("../utils/tools.js");
const fs = require('fs');

/// super class for all file types
class File {
  constructor(_path) {
    this.path = _path;

    // the dictionary that holds all the words and their code
    this.legend = new legend();
  }

  read_file_sync(_split_sign) {

    try {
      var data_from_file = fs.readFileSync(this.path, 'utf8').split(_split_sign);
    }
    catch (err) {
      alert("can't read this file, please check file");
      logger.debug("error while trying to read from file -> " + err);
      throw err;
    }
    return data_from_file;
  }

  compress() {
    console.log("this function creates a new compressed file");
  }

  decompress() {
    console.log("this function creates a new decompress file");
  }
}

module.exports = File
