var path = require('path')
var _ = require('underscore')
var walkdir = require('walkdir')
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
	var abspaths = walkdir.sync(dir)
	var paths = _.map(abspaths, function(abspath) {
		return path.relative(dir, abspath)
	})
	var matches = _.map(patterns, function(pattern) {
    var exclusion = pattern.indexOf('!') === 0
    if (exclusion) pattern = pattern.slice(1)
		var matches = minimatch.match(paths, pattern, options)
		return {exclusion: exclusion, matches: matches}
	})
	return applyMatches(matches)
}

module.exports = dirmatch
