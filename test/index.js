var run = require('tape').test
var parse = require('../')
var fs = require('fs')
var concat = require('concat-stream')
var filter = require('stream-filter')

var list = function(data) {
  var results = data.map(function(device) {
    return device.ip
  })
  results.sort(function(a, b) {
    return (
      +a.substr(a.lastIndexOf('.') + 1) >
      +b.substr(b.lastIndexOf('.') + 1)
    ) 
  })
  return results
}

var check = function(table, callback) {
  table
    .pipe(parse())
    .pipe(filter(function(device) {
      return !!device.mac
    }))
    .pipe(concat(function(data) {
      callback(list(data))
    }))
}

run('determines availability', function(test) {
  var linux = fs.createReadStream(__dirname + '/linux.txt')
  var osx = fs.createReadStream(__dirname + '/osx.txt')
  var windows = fs.createReadStream(__dirname + '/windows.txt')
  
  test.plan(3)

  check(linux, function(results) {
    var expected = [
      '192.168.0.1', '192.168.0.9',
      '192.168.0.11', '192.168.0.15'
    ]
    test.deepEqual(results, expected, 'on linux')
  })

  check(osx, function(results) {
    var expected = [
      '192.168.0.1', '192.168.0.2',
      '192.168.0.14'
    ]
    test.deepEqual(results, expected, 'on osx')
  })

  check(windows, function(results) {
    var expected = ['192.168.1.1']
    test.deepEqual(results, expected, 'on windows')
  })
})
