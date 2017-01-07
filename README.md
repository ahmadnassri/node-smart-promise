# Smart Promise [![version][npm-version]][npm-url] [![License][license-image]][license-url]

> Smart Promise is a Promise extension that provides filtered catch handler.

[![Build Status][travis-image]][travis-url]
[![Downloads][npm-downloads]][npm-url]
[![Code Climate][codeclimate-quality]][codeclimate-url]
[![Coverage Status][codeclimate-coverage]][codeclimate-url]
[![Dependency Status][dependencyci-image]][dependencyci-url]
[![Dependencies][david-image]][david-url]

## Benchamrks

[latest results](https://github.com/ahmadnassri/benchmark-node-promise-catch):

```
  bluebird      x  3,541 ops/sec ±1.70% (82 runs sampled)
  smart-promise x 99,766 ops/sec ±1.24% (86 runs sampled)
```

## Install

```bash
npm install --only=production --save smart-promise
```

## API

The same native [Promise API](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) applies, the only difference is the `catch()` method.

### .catch(onRejected)

Behaves normally as per the native [Promise API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)

### .catch(class ErrorClass | class CustomErrorClass | ... , onRejected)

A filtered variant of `catch` (like other non-JS languages typically have) that lets you only handle specific errors.

The catch handler that is first met that has eligible constructors specified, is the one that will be called.

###### Example:

```js
const Promise = require('smart-promise')
```

```js
Promise
  .then(_ => return a.b.c.d())

  .catch(TypeError, error => {
    // If the error is a "TypeError", this code block will execute
  })

  .catch(ReferenceError, error => {
    // If the error is a "ReferenceError", this code block will execute instead
  })

  .catch('TypedErrorName', error => {
    // If the error constructor matches "TypedErrorName", this code block will execute instead
  })

  .catch(error => {
  // Generic catch-the rest (error wasn't TypeError nor ReferenceError)
  })
```

You may also add multiple filters for a catch handler:

```js
Promise
  .then(_ => return a.b.c.d())

  .catch(TypeError, ReferenceError, error => {
    // Will end up here on programmer error
  })

  .catch(NetworkError, TimeoutError, 'SomeError', error => {
    // Will end up here on expected everyday network errors
  })

  .catch(error => {
    // Catch any unexpected errors
  })
```

You can also wrap it around existing promises, this is useful for managing 3rd party generated promises:

```js
const Smart = require('smart-promise')
const Library = require('some-other-promise-producting-library')

Smart.resolve(Library.action())
  .catch('SomeError', error => {})
```

---
> :copyright: [ahmadnassri.com](https://www.ahmadnassri.com/) &nbsp;&middot;&nbsp;
> License: [ISC][license-url] &nbsp;&middot;&nbsp;
> Github: [@ahmadnassri](https://github.com/ahmadnassri) &nbsp;&middot;&nbsp;
> Twitter: [@ahmadnassri](https://twitter.com/ahmadnassri)

[license-url]: http://choosealicense.com/licenses/isc/
[license-image]: https://img.shields.io/github/license/ahmadnassri/smart-promise.svg?style=flat-square

[travis-url]: https://travis-ci.org/ahmadnassri/smart-promise
[travis-image]: https://img.shields.io/travis/ahmadnassri/smart-promise.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/smart-promise
[npm-version]: https://img.shields.io/npm/v/smart-promise.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/smart-promise.svg?style=flat-square

[codeclimate-url]: https://codeclimate.com/github/ahmadnassri/smart-promise
[codeclimate-quality]: https://img.shields.io/codeclimate/github/ahmadnassri/smart-promise.svg?style=flat-square
[codeclimate-coverage]: https://img.shields.io/codeclimate/coverage/github/ahmadnassri/smart-promise.svg?style=flat-square

[david-url]: https://david-dm.org/ahmadnassri/smart-promise
[david-image]: https://img.shields.io/david/ahmadnassri/smart-promise.svg?style=flat-square

[dependencyci-url]: https://dependencyci.com/github/ahmadnassri/smart-promise
[dependencyci-image]: https://dependencyci.com/github/ahmadnassri/smart-promise/badge?style=flat-square
