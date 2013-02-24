var assert = require('assert')
var path = require('path')

var shimmy = require('../index.js')
var polyfill = require('polyfill')

suite('Polyfill')

test('test firefox', function(done) {
    shimmy({
        family:'firefox', 
        version:'3.0.1'
    }, ["JSON"], polyfill, function(error, shims) {
        assert.ifError(error)
        assert.equal(1, shims.length)
        assert.ok(shims[0].indexOf('JSON') !== -1)
        done()
    })
})

test('Nothing requested', function(done) {
    shimmy({family:'IE', version:'7.0'}, [], polyfill, function(error, shims) {
        assert.equal(0, shims.length)
        done()
    })
})

test('Nothing needed', function(done) {
    function emptyProvider(feature, callback) {
        if (!callback) return feature === 'JSON'
        callback(null, '')
    }
    shimmy({family:'IE', version:'9.0'}, ['JSON'], polyfill, function(error, shims) {
        assert.equal(0, shims.length)
        done()
    })
})
