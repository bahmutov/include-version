#!/usr/bin/env node

'use strict'

var fromCurrent = require('path').join.bind(null, process.cwd())

var fs = require('fs')
if (!fs.existsSync(fromCurrent('package.json'))) {
  throw new Error('Missing package.json')
}
var pkg = require(fromCurrent('package.json'))
if (!pkg.version) {
  throw new Error('Missing version in package.json')
}
if (!pkg.config) {
  throw new Error('Cannot find config inside package.json')
}
var label = 'include-version'
var myConfig = pkg.config[label]
var files = typeof myConfig === 'string' ? [myConfig] : myConfig
if (!Array.isArray(files)) {
  throw new Error('Invalid config for ' + label + ': ' + JSON.stringify(myConfig))
}
files.forEach(replaceVersionTag)

function replaceVersionTag (filename) {
  var tag = /\{\{\s?include\-version\s?\}\}/g
  var source = fs.readFileSync(fromCurrent(filename), 'utf8')
  var replaced = source.replace(tag, pkg.version)
  fs.writeFileSync(filename, replaced, 'utf8')
}
