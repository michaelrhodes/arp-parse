var stream = require('stream')
var util = require('util')
var parse = require('./lib/parse')

var Parse = function() {
  if (!(this instanceof Parse)) {
    return new Parse
  }
  stream.Transform.call(this)
  this._readableState.objectMode = true
}

util.inherits(Parse, stream.Transform)

Parse.prototype._transform = function(data, encoding, done) {
  var thy = this
  var table = data.toString().split(/\n|\r/)
  table.forEach(function(device) {
    var parsed = parse(device)
    if (parsed) {
      thy.push(parsed)
    }
  })
  done()
}

module.exports = Parse
