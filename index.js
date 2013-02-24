var browserspec = require('bs')

function getMissingFeatures(browser, desiredFeatures) {
    var browserSpec = browserspec(browser)
    return desiredFeatures.filter(function(feature) {
        return browserSpec[feature] !== true
    }).sort()
}

function getShimContents(neededFeatures, shimProvider, callback) {
    if (!neededFeatures || !neededFeatures.length) return callback(null, [])
    neededFeatures.forEach(function(feature) {
        if (!shimProvider(feature)) throw new Error("Unknown or unsupported feature: "+feature)
    })
    var shimSources = []
    var count = 0
    var foundError
    neededFeatures.forEach(function(name, index) {
        shimProvider(name, function(error, source) {
            if (error) {
                if (foundError) return
                foundError = true
                return callback(error)
            }
            shimSources[index] = source
            count++
            if (!foundError && count == neededFeatures.length) {
                callback(null, shimSources)
            }
        })
    })
}

module.exports = function(browser, desiredFeatures, shimProvider, callback) {
    var missingFeatures = getMissingFeatures(browser, desiredFeatures)
    getShimContents(missingFeatures, shimProvider, callback)
}