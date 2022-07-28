# Smart Promise

Smart Promise is a Promise extension that provides filtered catch handler.

[![license][license-img]][license-url]
[![release][release-img]][release-url]
[![semantic][semantic-img]][semantic-url]

## Benchamrks

[latest results][]

``` text
bluebird      x  3,541 ops/sec ±1.70% (82 runs sampled)
smart-promise x 99,766 ops/sec ±1.24% (86 runs sampled)
```

## Install

``` bash
npm install --production --save smart-promise
```

## API

The same native [Promise API][] applies, the only difference is the `catch()` method.

### .catch(onRejected)

Behaves normally as per the native [Promise API][1]

### .catch(class ErrorClass \| class CustomErrorClass \| ... , onRejected)

A filtered variant of `catch` (like other non-JS languages typically have) that lets you only handle specific errors.

The catch handler that is first met that has eligible constructors specified, is the one that will be called.

###### Example

Extend your existing `Promise` Libraries:

``` js
const { Smart } = require('smart-promise')

const Promise = Smart(MyPromiseLib)

// or, use the shorthand
const Promise = require('smart-promise')(MyPromiseLib)
```

Standalone:

``` js
const { Promise } = require('smart-promise')
```

``` js
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

``` js
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

``` js
const { Promise } = require('smart-promise')
const Library = require('some-other-promise-producting-library')

Promise.resolve(Library.action())
  .catch('SomeError', error => {})
```

## ESlint

If you're using `ESlint` or similar tooling, please refer to [`prefer-promise-reject-errors`][]

  [latest results]: https://github.com/ahmadnassri/benchmark-node-promise-catch
  [Promise API]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
  [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
  [`prefer-promise-reject-errors`]: https://eslint.org/docs/rules/prefer-promise-reject-errors

----
> Author: [Ahmad Nassri](https://www.ahmadnassri.com/) &bull;
> Twitter: [@AhmadNassri](https://twitter.com/AhmadNassri)

[license-url]: LICENSE
[license-img]: https://badgen.net/github/license/ahmadnassri/node-smart-promise

[release-url]: https://github.com/ahmadnassri/node-smart-promise/releases
[release-img]: https://badgen.net/github/release/ahmadnassri/node-smart-promise

[semantic-url]: https://github.com/ahmadnassri/node-smart-promise/actions?query=workflow%3Arelease
[semantic-img]: https://badgen.net/badge/📦/semantically%20released/blue
