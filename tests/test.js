var assert = require('assert')
var path = require('path')

var dirmatch = require('..')

describe('glob-array', function() {
	var DIR = path.join(__dirname, 'files')

	var PATTERNS = [
		'**/*.js',
		'**/*.css'
	]
	var EXPECTED_FILES = [
		'node/node.js',
		'scripts/index.js',
		'styles/index.css'
	]

	it('find files using all patterns', function() {
		var files = dirmatch(DIR, PATTERNS)
		assert.deepEqual(files, EXPECTED_FILES)
	})

	var NODE_FILE = 'node/node.js'

	it('uses negation patterns in right order', function() {
		var first = dirmatch(DIR, ['!node/**', '**/*.js'])
		var last = dirmatch(DIR, ['**/*.js', '!node/**'])
		assert(first.indexOf(NODE_FILE) !== -1)
		assert(last.indexOf(NODE_FILE) == -1)
	})
})
