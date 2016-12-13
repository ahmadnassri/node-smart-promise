'use strict'

const Smart = require('..')
const tap = require('tap')
const ExtendableError = require('@ahmadnassri/error')

class CustomError extends ExtendableError {}

tap.test('skip execution if no handler provided', assert => {
  assert.plan(1)

  return Smart.reject('foo')
    .catch('foo')
    .catch(error => assert.equal(error, 'foo'))
})

tap.test('default behaviour', assert => {
  assert.plan(1)

  return Smart.reject('foo')
    .catch(error => assert.equal(error, 'foo'))
    .catch(err => assert.fail('should not be triggered', { err }))
})

tap.test('Not Enough Arguments', assert => {
  assert.plan(1)

  return Smart.reject('foo')
    .catch('foo')
    .catch(err => assert.equal(err, 'foo'))
})

tap.test('Bad Arguments', assert => {
  assert.plan(1)

  return Smart.reject('foo')
    .catch('foo', 'bar')
    .catch(err => assert.equal(err, 'foo'))
})

tap.test('Error Objects', assert => {
  assert.plan(1)

  return Smart.reject(new Error('foo'))
    .catch(Error, error => assert.type(error, Error))
    .catch(err => assert.fail('should not be triggered', { err }))
})

tap.test('Custom Error Object', assert => {
  assert.plan(1)

  return Smart.reject(new CustomError('foo'))
    .catch(CustomError, error => assert.type(error, CustomError))
    .catch(err => assert.fail('should not be triggered', { err }))
})

tap.test('Named Error Object', assert => {
  assert.plan(1)

  return Smart.reject(new CustomError('foo'))
    .catch('CustomError', error => assert.type(error, CustomError))
    .catch(err => assert.fail('should not be triggered', { err }))
})

tap.test('Multiple Error Objects', assert => {
  assert.plan(1)

  return Smart.reject(new Error('foo'))
    .catch(CustomError, Error, error => assert.type(error, Error))
    .catch(err => assert.fail('should not be triggered', { err }))
})

tap.test('RegExP', assert => {
  assert.plan(1)

  return Smart.reject('foo')
    .catch(/fo/, Error, error => assert.equal(error, 'foo'))
    .catch(err => assert.fail('should not be triggered', { err }))
})

tap.test('RegExP Like', assert => {
  assert.plan(1)

  return Smart.reject('foo')
    .catch('fo', Error, error => assert.equal(error, 'foo'))
    .catch(err => assert.fail('should not be triggered', { err }))
})

tap.test('Multiple RegExp', assert => {
  assert.plan(1)

  return Smart.reject('bar')
    .catch(/fo/, /ba/, Error, error => assert.equal(error, 'bar'))
    .catch(err => assert.fail('should not be triggered', { err }))
})

tap.test('match one type', assert => {
  assert.plan(1)

  return Smart.reject('foo')
    .catch('foo', error => assert.equal(error, 'foo'))
    .catch(err => assert.fail('should not be triggered', { err }))
})

tap.test('no match', assert => {
  assert.plan(1)

  return Smart.reject('foo')
    .catch('errar', /bar/, CustomError, err => assert.fail('should not be triggered', { err }))
    .catch(error => assert.equal(error, 'foo'))
})

tap.test('multiple matches', assert => {
  assert.plan(1)

  return Smart.reject('bar')
    .catch(Error, 'foo', 'bar', error => assert.equal(error, 'bar'))
    .catch(err => assert.fail('should not be triggered', { err }))
})

tap.test('immediate invocation', assert => {
  assert.plan(1)

  return Smart.reject('bar')
    .catch('foo', 'bar', error => assert.equal(error, 'bar'))
    .catch(err => assert.fail('should not be triggered', { err }))
})
