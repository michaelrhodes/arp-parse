var stream = require('stream')
var util = require('util')
var parse = require('./lib/parse')

var arpparse = function() {
  if (!(this instanceof arpparse)) {
    return new arpparse
  }
  stream.Transform.call(this)
  this._readableState.objectMode = true
}

util.inherits(arpparse, stream.Transform)

arpparse.prototype._transform = function(data, encoding, done) {
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

module.exports = arpparse
