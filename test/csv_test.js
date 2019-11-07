const fs = require('fs')
var assert = require('chai').assert;
const CSV = require("../enteties/csv.js");


describe('csv module test', function () {
  it('should succeed compress the file', function () {
    var test_compress_file = new CSV("./test/example_files/csv/basic.csv");

    try {
      test_compress_file.compress();
    }
    catch (err) {
      assert(!err, "not suppose to get here");
    }
    assert(fs.existsSync("./test/example_files/csv/basic_compressed.txt"));
  })

  it("should fail with 'no such file' error", function () {
    var test_compress_file = new CSV("/basic.csv");

    try {
      test_compress_file.compress();
    }
    catch (err) {
      assert(err.errno == -2);
    }
    // reset file's content
    fs.writeFile("./test/example_files/csv/basic_test.txt", "Hi I am a basic text", function (err) {
      if (err) {
        console.log("error in test N.3 -> ", err);
      } });
  })

  it("should fail because compressed file doesn't exist", function () {
    var test_compress_file = new CSV("./test/example_files/csv/basic_test.txt");

    try {
      test_compress_file.compress();
    }
    catch (err) {
      assert(!err, "not suppose to get here");
    }
    // compressed file is not created
    assert(!fs.existsSync("./test/example_files/csv/basic_test_compressed.txt"));

    // reset file's content
    fs.writeFile("./test/example_files/csv/basic_test.txt", "Hi I am a basic text", function (err) {
      if (err) {
        console.log("error in test N.3 -> ", err);
      } });
  })

  it("should fail for not receiving string or buffer", function () {
    var test_compress_file = new CSV();

    try {
      test_compress_file.compress();
    }
    catch (err) {
      assert(err.code == "ERR_INVALID_ARG_TYPE");
    }
  })
})