node-shimmy [![Build Status](https://travis-ci.org/marcello3d/node-shimmy.png)](https://travis-ci.org/marcello3d/node-shimmy)
==================

Node shimmy combines [browserspec](https://github.com/marcello3d/node-bs) and 
[polyfill.js](https://github.com/marcello3d/polyfill.js) to dynamically provide you with source files to make up for 
broken browsers.

Usage
-----

```js
var shimmy = require('shimmy')
var polyfill = require('polyfill')

shimmy({
    family:'firefox', 
    version:'3.0.1'
}, ["JSON"], polyfill, function(error, shims) {
    // do something with shims
})
```

Use [useragent](https://github.com/3rd-Eden/useragent) to parse the user agent:

```js
var shimmy = require('shimmy')
var polyfill = require('polyfill')
var useragent = require('useragent')

var browser = useragent.parse("Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; .NET CLR 1.1.4322; .NET CLR 1.0.3705)")
shimmy(browser, ["Date.now", "JSON"], polyfill, function(error, shims) {
    // do something with shims
})

```

License
-------
Open source software under the [zlib license](LICENSE).