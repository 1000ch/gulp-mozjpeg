var path    = require('path');
var mozjpeg = require('../');
var isJpg   = require('is-jpg');
var read    = require('vinyl-file').read;
var assert  = require('power-assert');

it('should minify JPG images', function (callback) {

  this.timeout(10000);

  var p = path.join(__dirname, '/fixtures/test.jpg');

  read(p, function (error, file) {
    assert(!error, error);

    var stream = mozjpeg();
    var length = file.contents.length;

    stream.on('data', function (data) {
      assert(data.contents.length < length, data.contents.length);
      assert(isJpg(data.contents));
    });

    stream.on('end', callback);

    stream.end(file);
  });
});