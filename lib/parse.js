var ipv4 = /([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/
var mac = /([0-9a-f]{1,2}[:\-][0-9a-f]{1,2}[:\-][0-9a-f]{1,2}[:\-][0-9a-f]{1,2}[:\-][0-9a-f]{1,2}[:\-][0-9a-f]{1,2})/
var unavailable = /([0:\-]{11,17}|incomplete|unreachable)/

var invalid = function(device, address) {
  // If an IP address is at the end of a line,
  // it’s probably from outside of the table.
  return RegExp(address.replace(/\./g, '\\.') + '$')
    .test(device.trim()) 
}

var find = function(string, pattern) {
  return (pattern.exec(string) || []).slice(1)[0] || null
}

module.exports = function(device) {
  var address = find(device, ipv4)

  if (!address || invalid(device, address)) {
    return false
  }

  var parsed = {
    ip: address,
    mac: find(device, mac)
  }

  if (unavailable.test(device)) {
    parsed.mac = null 
  }

  return parsed
}
