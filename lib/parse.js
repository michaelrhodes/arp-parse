var ipv4 = /([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/
var mac = /([0-9a-f]{1,2}[:\-][0-9a-f]{1,2}[:\-][0-9a-f]{1,2}[:\-][0-9a-f]{1,2}[:\-][0-9a-f]{1,2}[:\-][0-9a-f]{1,2})/
var unavailable = /([0:\-]{11,17}|incomplete|unreachable)/
var hostname = /^([^\s^\?]*)/

var find = function(string, pattern) {
  return (pattern.exec(string) || []).slice(1)[0] || null
}

module.exports = function(device) {
  var address = find(device, ipv4)

  if (!address || /Interface:/.test(device)) {
    return false
  }

  var parsed = {
    ip: address,
    mac: find(device, mac),
    hostname: find(device, hostname)
  }

  if (unavailable.test(device)) {
    parsed.mac = null
  }

  return parsed
}
