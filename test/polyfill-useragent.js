var assert = require('assert')
var path = require('path')

var shimmy = require('../index.js')

var polyfill = require('polyfill')
var useragent = require('useragent')

suite('Polyfill + useragent')

test('IE 8 + Date.now,JSON', function(done) {
    var browser = useragent.parse("Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; .NET CLR 1.1.4322; .NET CLR 1.0.3705)")
    shimmy(browser, ["Date.now", "JSON"], polyfill, function(error, shims) {
        assert.ifError(error)
        assert.equal(1, shims.length)
        assert.ok(shims[0].indexOf('Date.now') !== -1)
        done()
    })
})
