# include-version

> Adds package version to the built file before semantic release publishes it

[![NPM][npm-icon] ][npm-url]

[![Build status][ci-image] ][ci-url]
[![semantic-release][semantic-image] ][semantic-url]
[![js-standard-style][standard-image]][standard-url]

## Why?

If you use [semantic release](https://github.com/semantic-release/semantic-release) 
(and you should!) then the version inside `package.json` is no longer controlled by you directly.
Instead, the automated step on CI server determines the version bump and sets it right before
publishing to NPM registry. Typically I keep the placeholder version in `package.json` anyway -
a lot of tools display a warning or break if this file is missing version property completely.

```json
{
  "name": "my-tool",
  "version": "0.0.0-semantic-release",
  "description": "..."
}
```

When publishing from CI, the command goes like this

```json
{
  "scripts": {
    "semantic-release": "semantic-release pre && npm publish && semantic-release post"
  }
}
```

The `semantic-release pre` looks at the last published version, computes the version bump
(major, minor or patch), then writes the new version into `package.json` before proceeding
to `npm publish`.

A lof of time I build a bundle of JavaScript in my libraries. I love embedding the version
in the bundle because it gives the user a very simple way to determine which software is running.
Other libraries do it too, for example Angular has version property

```
angular.version
//  {full: "1.3.14", major: 1, minor: 3, dot: 14, codeName: "..."}
```

Yet, I cannot embed the version when building the bundle, even on CI, because the version has
NOT been determined yet! Thus this tool `include-version`. Just add it before `npm publish`
command and it will grab the version from the `package.json` (already set by 
`semantic-release pre`) and will replace the placeholder text in the bundle files.

    npm install --save-dev include-version
```json
{
  "scripts": {
    "semantic-release": "semantic-release pre && include-version && npm publish && semantic-release post"
  },
  "config": {
    "include-version": ["dist/bundle.js", "dist/bundle-min.js"]
  }
}
```

As shown above, you configure which files to update in `package.json` "config" block.
All file paths are relative to the current working folder, which is the root folder of the 
NPM package.
In all files, the tool will replace string `{{ include-version }}` if found. Thus I usually
have something like this in my library source

```js
module.exports = {
  // bunch of code
  VERSION: '{{ include-version }}'
}
```

which will get set just before publishing to NPM.

## Example

For example, this file has the version in the line below

**version {{ include-version }}**

On [Github](https://github.com/bahmutov/include-version#example), 
this file shows the original raw text. 
On [NPM registry](https://www.npmjs.com/package/include-version#example) 
it shows the current published version.

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2016


* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog)


License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/include-version/issues) on Github

## MIT License

Copyright (c) 2016 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/include-version.png?downloads=true
[npm-url]: https://npmjs.org/package/include-version
[ci-image]: https://travis-ci.org/bahmutov/include-version.png?branch=master
[ci-url]: https://travis-ci.org/bahmutov/include-version
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
