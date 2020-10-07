# Smart Promise

[![license][license-img]][license-url]
[![version][npm-img]][npm-url]
[![super linter][super-linter-img]][super-linter-url]
[![test][test-img]][test-url]
[![release][release-img]][release-url]

[license-url]: LICENSE
[license-img]: https://badgen.net/github/license/ahmadnassri/node-smart-promise

[npm-url]: https://www.npmjs.com/package/smart-promise
[npm-img]: https://badgen.net/npm/v/smart-promise

[super-linter-url]: https://github.com/ahmadnassri/node-smart-promise/actions?query=workflow%3Asuper-linter
[super-linter-img]: https://github.com/ahmadnassri/node-smart-promise/workflows/super-linter/badge.svg

[test-url]: https://github.com/ahmadnassri/node-smart-promise/actions?query=workflow%3Atest
[test-img]: https://github.com/ahmadnassri/node-smart-promise/workflows/test/badge.svg

[release-url]: https://github.com/ahmadnassri/node-smart-promise/actions?query=workflow%3Arelease
[release-img]: https://github.com/ahmadnassri/node-smart-promise/workflows/release/badge.svg

> Smart Promise is a Promise extension that provides filtered catch handler.

## Benchamrks

[latest results](https://github.com/ahmadnassri/benchmark-node-promise-catch):

```text
bluebird      x  3,541 ops/sec ±1.70% (82 runs sampled)
smart-promise x 99,766 ops/sec ±1.24% (86 runs sampled)
```

## Install

```bash
npm install --production --save smart-promise
```

## API

The same native [Promise API](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) applies, the only difference is the `catch()` method.

### .catch(onRejected)

Behaves normally as per the native [Promise API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)

### .catch(class ErrorClass | class CustomErrorClass | ... , onRejected)

A filtered variant of `catch` (like other non-JS languages typically have) that lets you only handle specific errors.

The catch handler that is first met that has eligible constructors specified, is the one that will be called.

###### Example

Extend your existing `Promise` Libraries:

```js
const { Smart } = require('smart-promise')

const Promise = Smart(MyPromiseLib)

// or, use the shorthand
const Promise = require('smart-promise')(MyPromiseLib)
```

Standalone:

```js
const { Promise } = require('smart-promise')
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

You can also wrap it around existing promises resolvers, this is useful for managing 3rd party generated promises:

```js
const { Promise } = require('smart-promise')
const Library = require('some-other-promise-producting-library')

Promise.resolve(Library.action())
  .catch('SomeError', error => {})
```

## ESlint

If you're using `ESlint` or similar tooling, please refer to [`prefer-promise-reject-errors`][prefer-promise-reject-errors]
