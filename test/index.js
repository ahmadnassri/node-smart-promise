const Promise = require('..')
const tap = require('tap')

function CustomError (message) {
  this.name = 'CustomError'
  this.message = message

  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(this, this.constructor)
  } else {
    this.stack = (new Error(message)).stack
  }
}

CustomError.prototype = Error.prototype

tap.test('skip execution if no handler provided', (assert) => {
  assert.plan(1)

  new Promise((resolve, reject) => reject('foo'))
    .catch('foo')
    .catch(error => assert.equal(error, 'foo'))
})

tap.test('default behaviour', (assert) => {
  assert.plan(1)

  new Promise((resolve, reject) => reject('foo'))
    .catch(error => assert.equal(error, 'foo'))
    .catch(() => assert.fail('this should not be triggered'))
})

tap.test('Error Objects', (assert) => {
  assert.plan(1)

  new Promise((resolve, reject) => reject(new Error('foo')))
    .catch(Error, error => assert.type(error, Error))
    .catch(() => assert.fail('this should not be triggered'))
})

tap.test('Custom Error Object', (assert) => {
  assert.plan(1)

  new Promise((resolve, reject) => reject(new CustomError('foo')))
    .catch(CustomError, error => assert.type(error, CustomError))
    .catch(() => assert.fail('this should not be triggered'))
})

tap.test('Multiple Error Objects', (assert) => {
  assert.plan(1)

  new Promise((resolve, reject) => reject(new Error('foo')))
    .catch(CustomError, Error, error => assert.type(error, Error))
    .catch(() => assert.fail('this should not be triggered'))
})

tap.test('match one type', (assert) => {
  assert.plan(1)

  new Promise((resolve, reject) => reject('foo'))
    .catch('foo', error => assert.equal(error, 'foo'))
    .catch(() => assert.fail('this should not be triggered'))
})

tap.test('no match', (assert) => {
  assert.plan(1)

  new Promise((resolve, reject) => reject('foo'))
    .catch('bar', () => assert.fail('this should not be triggered'))
    .catch(error => assert.equal(error, 'foo'))
})

tap.test('multiple matches', (assert) => {
  assert.plan(1)

  new Promise((resolve, reject) => reject('bar'))
    .catch(Error, 'foo', 'bar', error => assert.equal(error, 'bar'))
    .catch(() => assert.fail('this should not be triggered'))
})

tap.test('immediate invocation', (assert) => {
  assert.plan(1)

  Promise.reject('bar')
    .catch('foo', 'bar', error => assert.equal(error, 'bar'))
    .catch(() => assert.fail('this should not be triggered'))
})
