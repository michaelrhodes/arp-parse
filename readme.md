# arp-parse
arp-parse is a transform stream that consumes ARP tables and emits JSON representations of their contents.

[![Build status](https://travis-ci.org/michaelrhodes/arp-parse.png?branch=master)](https://travis-ci.org/michaelrhodes/arp-parse)

## Install

```
npm install arp-parse
```

### Output
```
  arp-table | arp-parse >> file.txt

  file.txt
  --------
  {
    ip: xxx.xxx.xxx.xxx,
    mac: xx:xx:xx:xx:xx:xx || null,
  }
  {
    ip: xxx.xxx.xxx.xxx
    mac: xx:xx:xx:xx:xx:xx || null
  }
  etc.
```

### Example

``` js
var arp = require('arp-table')()
var parse = require('arp-parse')()
var through = require('through')
var filter = require('stream-filter')(function(device) {
  return !!device.mac
})

// Print out the available devices on
// the local network (besides our own).
arp.stdout
  .pipe(parse)
  .pipe(filter)
  .pipe(through(function(device) {
    this.queue(device.ip + '\n')
  }))
  .pipe(process.stdout)
```

### License
[MIT](http://opensource.org/licenses/MIT)
