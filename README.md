# rc-editor-list
---

React EditorList Component


[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/rc-editor-list.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-editor-list
[travis-image]: https://img.shields.io/travis/ant-motion/editor-list.svg?style=flat-square
[travis-url]: https://travis-ci.org/ant-motion/editor-list
[coveralls-image]: https://img.shields.io/coveralls/ant-motion/editor-list.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/ant-motion/editor-list?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/ant-motion/editor-list.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/ant-motion/editor-list
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-editor-list.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-editor-list


## Browser Support

|![IE](https://github.com/alrra/browser-logos/blob/master/src/edge/edge_48x48.png?raw=true) | ![Chrome](https://github.com/alrra/browser-logos/blob/master/src/chrome/chrome_48x48.png?raw=true) | ![Firefox](https://github.com/alrra/browser-logos/blob/master/src/firefox/firefox_48x48.png?raw=true) | ![Opera](https://github.com/alrra/browser-logos/blob/master/src/opera/opera_48x48.png?raw=true) | ![Safari](https://github.com/alrra/browser-logos/blob/master/src/safari/safari_48x48.png?raw=true)|
| --- | --- | --- | --- | --- |
| IE 10+ ✔ | Chrome 31.0+ ✔ | Firefox 31.0+ ✔ | Opera 30.0+ ✔ | Safari 7.0+ ✔ |

## Development

```
npm install
npm start
```

## Example

http://localhost:8022/examples/


online example: http://ant-motion.github.io/editor-list/


## Feature

* support ie8,ie8+,chrome,firefox,safari

### Keyboard


## install


[![rc-editor-list](https://nodei.co/npm/rc-editor-list.png)](https://npmjs.org/package/rc-editor-list)


## Usage

```js
var EditorList = require('rc-editor-list');
var React = require('react');
React.render(<EditorList />, container);
```

## API

### props

- extends ant design Collapse

| name       |type            |default  |description     |
|------------|----------------|---------|----------------|
| editorElem | DOMElement     | null    | editor dom   |
| onChange   | func           | null    | change callback |
| useClassName | bool   | true   |  use className or style |
| isMobile   | bool  | false | edit mobile style |
| editorDefaultClassName | string | editor_css| default editor class name|
| parentClassNameCanUseTagName | bool |  true | parent can use tag name |
| parentClassNameLength | number |  2 | parent class name length |


## License

rc-editor-list is released under the MIT license.
