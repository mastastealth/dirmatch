var path = require('path')
var _ = require('underscore')
var walk = require('walk-sync')
var minimatch = require('minimatch')

function applyMatches(matches) {
	var result = []
	_.each(matches, function(match) {
		result = match.exclusion ?
			_.difference(result, match.matches) :
			_.union(result, match.matches)
	})
	return result
}

var dirmatch = function(dir, patterns, options) {
	var paths = walk(dir)
	var matches = _.map(patterns, function(pattern) {
    var exclusion = pattern.indexOf('!') === 0
    if (exclusion) pattern = pattern.slice(1)
		var matches = minimatch.match(paths, pattern, options)
		return {exclusion: exclusion, matches: matches}
	})
	return applyMatches(matches)
}

module.exports = dirmatch
