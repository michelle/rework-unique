var rework = require('rework');
var unique = require('../');
var diff = require('diff');
var fs = require('fs');
var FILE = 'test/css/unique';

function testUnique() {
  var expected = fs.readFileSync(FILE + '.out.css', 'utf8').trim();
  var actual = rework(fs.readFileSync(FILE + '.css', 'utf8'))
    .use(unique())
    .toString()
    .trim();
  if (actual !== expected) {
    var error = 'Failed!\n';
    var result = diff.diffLines(expected, actual);
    for (var i = 0, len = result.length; i < len; i += 1) {
      var d = result[i];
      if (d.added) {
        error += '[+] ' + d.value;
      } else if (d.removed) {
        error += '[-] ' + d.value;
      } else {
        error += '    ' + d.value;
      }
    }
    throw new Error(error);
  }
  console.log('Unique test passed!');
}

testUnique();
