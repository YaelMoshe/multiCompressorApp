console.log("file.js file");

class File {
  constructor(path, size) {
    this.path = path;
    this.size = size;
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
