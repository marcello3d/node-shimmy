var assert = require('assert')
var path = require('path')

var shimmy = require('../index.js')

suite('Simple')

test('Fake JSON sham provider', function(done) {
    var SHAM_CODE = "Fake JSON code"
    var shamProvider = function(feature, callback) {
        if (!callback) return feature === 'JSON'
        callback(null, SHAM_CODE)
    }
    shimmy({family:'IE', version:'7.0'}, ['JSON'], shamProvider, function(error, shims) {
        assert.ifError(error)
        assert.equal(1, shims.length)
        assert.equal(SHAM_CODE, shims[0])
        done()
    })
})


test('Unsupported sham feature', function(done) {
    function emptyProvider() {
        return false
    }
    try {
        shimmy({family:'IE', version:'7.0'}, ['JSON'], emptyProvider, function(error, shims) {
            assert.fail("callback called")
            done()
        })
        assert.fail("no exception thrown")
    } catch (ex) {
        assert.ok("success!")
        done()
    }
})

test('Nothing requested', function(done) {
    function emptyProvider() { return false }
    
    shimmy({family:'IE', version:'7.0'}, [], emptyProvider, function(error, shims) {
        assert.equal(0, shims.length)
        done()
    })
})

test('Nothing needed', function(done) {
    function emptyProvider(feature, callback) {
        if (!callback) return feature === 'JSON'
        callback(null, '')
    }
    shimmy({family:'IE', version:'9.0'}, ['JSON'], emptyProvider, function(error, shims) {
        assert.equal(0, shims.length)
        done()
    })
})
