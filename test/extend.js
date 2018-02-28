'use strict'

const Smart = require('..')
const tap = require('tap')

tap.test('extends custom promises', assert => {
  assert.plan(2)

  class Custom extends Promise {
    static customMethod () {
      return 'foo'
    }
  }

  const InheritedSmartPromise = Smart(Custom)

  return InheritedSmartPromise.reject('foo')
    .catch('fo', Error, error => assert.equal(error, 'foo'))
    .then(() => assert.equal(InheritedSmartPromise.customMethod(), 'foo'))
    .catch(err => assert.fail('should not be triggered', { err }))
})
