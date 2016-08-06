# simon [![version][npm-version]][npm-url] [![License][npm-license]][license-url]

> Simon is a Promise extension that provides filtered catch handler ... made for Simon.

[![Build Status][travis-image]][travis-url]
[![Downloads][npm-downloads]][npm-url]
[![Code Climate][codeclimate-quality]][codeclimate-url]
[![Coverage Status][codeclimate-coverage]][codeclimate-url]
[![Dependencies][david-image]][david-url]

## Install

```bash
npm install --production --save simon-promise
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
somePromise
  .then(_ => return a.b.c.d())
  .catch(TypeError, error => {
    // If the error is a "TypeError", this code block will execute
  })

  .catch(ReferenceError, error => {
    // If the error is a "ReferenceError", this code block will execute instead
  })

  .catch(error => {
  // Generic catch-the rest (error wasn't TypeError nor ReferenceError)
  })
```

You may also add multiple filters for a catch handler:

```js
somePromise
  .then(_ => return a.b.c.d())

  .catch(TypeError, ReferenceError, error => {
    // Will end up here on programmer error
  })

  .catch(NetworkError, TimeoutError, error => {
    // Will end up here on expected everyday network errors
  })

  .catch(error => {
    // Catch any unexpected errors
  })
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
