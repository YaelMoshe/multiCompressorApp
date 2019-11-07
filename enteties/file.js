/// super class for all file types
class File {
  constructor(_path) {
    this.path = _path;

    // the dictionary that holds all the words and their code
    this.legend = {};
    this.legend_count = 0;
  }

  compress() {
    console.log("this function creates a new compressed file");
  }

  decompress() {
    console.log("this function creates a new decompress file");
  }
}

module.exports = File
