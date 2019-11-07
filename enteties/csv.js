/***
 * csv class, extends from file class
 */

const File = require("./file.js");
const fs = require('fs');
var Logger = require('../utils/logger.js');
var logger = new Logger().getInstance();


class CSV extends File {

  compress() {
    logger.info("compressing file");

    /// Read from desired file
    try {
      var data_from_file = fs.readFileSync(this.path, 'utf8').split(",");
    }
    catch (err) {
      logger.debug("error while trying to read from file -> " + err);
      throw err;
    }

    var data_len = data_from_file.length;

    /// Create compressed_file path
    var compressed_file = (this.path).replace(".csv", "_compressed.txt");
    logger.debug("compressed_file path is: " + compressed_file);

    /// Go over the file - row by row
    for(var i = 0; i < data_len; ++i) {
      var row = data_from_file[i].split(",");
      var r_length = row.length;

      /// Create new file and add number of columns to it
      if (i === 0) {
        logger.info("creating compressed file - " + compressed_file);
        fs.writeFile(compressed_file, r_length + ",", function (err) {
          if (err) {
            logger.error("error while trying to write compressed file \n" + err);          
            throw err;
          } });
          logger.debug("number of columns is: " + r_length);
      }
      logger.debug("row number " + i + " is: " + data_from_file[i]);

      /// Go over the row - word by word
      for(var j = 0; j < r_length; ++j) {
        var word = row[j];
        logger.debug("word number " + j + " is: " + word);

        /// Check if word is in legend, if not - add it
        if (!(word in this.legend)) {
          this.legend[word] = this.legend_count;
          ++this.legend_count;
        }
        /// Add the word's code to the compressed_file
        fs.appendFile(compressed_file, this.legend[word] + ",", function (err) {
          if (err) throw err; });
      }
    }
    /// Add the legend to the compressed_file
    fs.appendFile(compressed_file, "@" + JSON.stringify(this.legend), function (err) {
      if (err) throw err; });
  }

  decompress() {
    // create decompressed_file path
    // var decompressed_file = (this.path).replace("_compressed.txt", "_new.csv");
    // logger.debug("decompressed_file path is: " + decompressed_file);
    
    // var data_from_file = fs.readFileSync(this.path, 'utf8');

    // console.log(this.path)
    // console.log("jjj" + data_from_file)
    // if data_from_file length is 1, something is wrong

    // var data = data_from_file[0].split(",");
    // console.log(data)
    // var legend = data_from_file[1];
    // console.log(legend)
    // swap(legend);

    // go over the coded file
    // for(var i = 0; i < data.length; ++i) {
    //   // var row = data_from_file[i].split(",");
    //   // var r_length = row.length;
      
    //   // get the number of columns
    //   if (i === 0) {
    //     var col = data[i];
    //     logger.debug("number of columns is: " + col);
    //     continue;
    //   }
      // logger.debug("row is: " + data_from_file[i]);
      
      // go over the row - word by word
      // for(var j = 0; j < r_length; ++j) {
      //   var word = row[j];
      //   logger.debug("word is: " + word);

      //   if (!(word in this.legend)) {
      //     this.legend[word] = this.legend_count;
      //     ++this.legend_count;
      //   }
      //   // add to the compressed_file the new word
      //   fs.appendFile(decompressed_file, this.legend[word] + ",", function (err) {
      //     if (err) throw err; });
      // }
    // }
    // // add to the compressed_file the legend
    // fs.appendFile(compressed_file, "@" + JSON.stringify(this.legend) + ",", function (err) {
    //   if (err) throw err; }); 
  }
}

function swap(dict){
  var ret = {};
  console.log(JSON.parse(dict));
  for(var key in dict){
    ret[dict[key]] = key;
  }
  return ret;
}
module.exports = CSV
