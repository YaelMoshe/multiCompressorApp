/***
 * csv class, extends from file class
 */

const File = require("./file.js");
const fs = require('fs');
var Logger = require('../utils/logger.js');
var logger = new Logger().getInstance();


class CSV extends File {

  compress() {
    logger.debug("compressing file");

    /// Read from desired file
    var data_from_file = this.read_file_sync("\n");

    /// Create compressed_file path
    var compressed_file = (this.path).replace(".csv", "_compressed.txt");
    var N_rows = data_from_file.length;

    /// Go over the file - row by row
    for(var i = 0; i < N_rows; ++i) {
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
        var word = row[j].trim();

        /// Check if word is in legend, if not - add it
        if (!(word in this.legend.struct)) {
          this.legend.struct[word] = this.legend.count;
          ++this.legend.count;
        }
        /// Add the word's code to the compressed_file
        fs.appendFile(compressed_file, this.legend.struct[word] + ",", function (err) {
          if (err) throw err; });
      }
    }
    /// Add the legend to the compressed_file
    fs.appendFile(compressed_file, "@" + JSON.stringify(this.legend.struct), function (err) {
      if (err) throw err; });
    
    alert("compress process is completed");
  }

  decompress() {
    /// Read from desired file
    var data_from_file = this.read_file_sync("@");

    // remove last ,
    var data = data_from_file[0].substring(0, data_from_file.length - 1);
    // if data_from_file length is 1, something is wrong
    var data_arr = data.split(",");
    var stringy_dict = data_from_file[1];

    logger.debug("data_arr is: " + data_arr + "\n dict is: " + stringy_dict)

    // swap key with value
    this.legend.key_value_swap(stringy_dict);
    
    // create decompressed_file path
    var decompressed_file = (this.path).replace("_compressed.txt", "_new.csv");
    logger.debug("decompressed_file path is: " + decompressed_file);

    // go over the coded file
    for(var i = 0; i < data_arr.length; ++i) {
      // get number of columns
      if (i === 0) {
        var N_col = data_arr[i];
        logger.debug("number of columns is: " + N_col);
        continue;
      }
      /// Add the word to the csv file
      fs.appendFile(decompressed_file, this.legend.struct[data_arr[i]] + ",", function (err) {
        if (err) throw err; });
      
      // break line if number of columns has passed
      if ((i) % N_col == 0) {
        fs.appendFile(decompressed_file, "\n", function (err) {
          if (err) throw err; });
      }
    }
    alert("decompress process is completed");
  }
}

module.exports = CSV
