# simon [![version][npm-version]][npm-url] [![License][npm-license]][license-url]

> unnamed package

[![Build Status][travis-image]][travis-url]
[![Downloads][npm-downloads]][npm-url]
[![Code Climate][codeclimate-quality]][codeclimate-url]
[![Coverage Status][codeclimate-coverage]][codeclimate-url]
[![Dependencies][david-image]][david-url]

## Install

```bash
npm install --production --save simon
```

## Usage

I reccomend using an optimized build matching your Node.js environment version, otherwise, the standard `require` would work just fine.

```js
/*
 * Node 6
 * Built using `babel-preset-es2015-node6`
 */
const simon = require('simon/lib/node6')

/*
 * Node 5
 * Built using `babel-preset-es2015-node5`
 */
const simon = require('simon/lib/node5')

/*
 * Node 4
 * Built using `babel-preset-es2015-node4`
 */
const simon = require('simon/lib/node4')

/*
 * Node >=0.10 <=0.12
 * Built using `babel-preset-es2015`
 * Note: 
 *   - additional package is required: `babel-runtime`
 *   - npm install --save babel-runtime
 */
var simon = require('simon')
```

## API

### simon()

```js
import simon from 'simon'

simon()
```

----
> :copyright: [www.ahmadnassri.com](https://www.ahmadnassri.com/) &nbsp;&middot;&nbsp;
> License: [ISC](LICENSE) &nbsp;&middot;&nbsp;
> Github: [@ahmadnassri](https://github.com/ahmadnassri) &nbsp;&middot;&nbsp;
> Twitter: [@ahmadnassri](https://twitter.com/ahmadnassri)

[license-url]: http://choosealicense.com/licenses/isc/

[travis-url]: https://travis-ci.org/ahmadnassri/simon
[travis-image]: https://img.shields.io/travis/ahmadnassri/simon.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/simon
[npm-license]: https://img.shields.io/npm/l/simon.svg?style=flat-square
[npm-version]: https://img.shields.io/npm/v/simon.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/simon.svg?style=flat-square

[codeclimate-url]: https://codeclimate.com/github/ahmadnassri/simon
[codeclimate-quality]: https://img.shields.io/codeclimate/github/ahmadnassri/simon.svg?style=flat-square
[codeclimate-coverage]: https://img.shields.io/codeclimate/coverage/github/ahmadnassri/simon.svg?style=flat-square

[david-url]: https://david-dm.org/ahmadnassri/simon
[david-image]: https://img.shields.io/david/ahmadnassri/simon.svg?style=flat-square
