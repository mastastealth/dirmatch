#dirmatch

Match multiple patterns with all files in directory using
[minimatch](https://github.com/isaacs/minimatch).

##Install

```
npm install dirmatch
```

##Usage

```
var dirmatch = require('dirmatch')

var matches = dirmatch('path/of/dir', [
  '*.js',
  '!node/*.js'
])
```

###dirmatch(dir, patterns, options)

Matches patterns with paths in directory.
<br>
Returns array of matched paths.

####dir

Type: `string`

Directory path.

####patterns

Type: `array<string>`

List of minimatch patterns.

Patterns that begin with `!` will exclude files.
Patterns are processed in order, so inclusion and exclusion order is significant.

####options

Type: `object`

Options for minimatch.

##License

Public domain, see the `LICENCE.md` file.



