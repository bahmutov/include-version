'use strict'

const fs = require('fs')
if (!fs.existsSync('./package.json')) {
  throw new Error('Missing package.json')
}
const pkg = require('./package.json')
if (!pkg.version) {
  throw new Error('Missing version in package.json')
}
if (!pkg.config) {
  throw new Error('Cannot find config inside package.json')
}
const label = 'include-version'
const myConfig = pkg.config[label]
const files = typeof myConfig === 'string' ? [myConfig] : myConfig
if (!Array.isArray(files)) {
  throw new Error('Invalid config for ' + label + ': ' + JSON.stringify(myConfig))
}
files.forEach(replaceVersionTag)

function replaceVersionTag (filename) {
  const tag = /\{\{\s?include\-version\s?\}\}/g
  const source = fs.readFileSync(filename, 'utf8')
  const replaced = source.replace(tag, pkg.version)
  fs.writeFileSync(filename, replaced, 'utf8')
}
