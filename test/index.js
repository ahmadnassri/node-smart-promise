const Simon = require('../index')
const tap = require('tap')

tap.test('simon', tap => {
  tap.plan(7)

  tap.test('skip execution if no handler provided', assert => {
    assert.plan(1)

    new Simon((resolve, reject) => reject('foo'))
      .catch('foo')
      .catch(error => assert.equal(error, 'foo'))
  })

  tap.test('default behaviour', assert => {
    assert.plan(1)

    new Simon((resolve, reject) => reject('foo'))
      .catch(error => assert.equal(error, 'foo'))
      .catch(_ => assert.fail('this should not be triggered'))
  })

  tap.test('Error Objects', assert => {
    assert.plan(1)

    new Simon((resolve, reject) => reject(new Error('foo')))
      .catch(Error, error => assert.type(error, Error))
      .catch(_ => assert.fail('this should not be triggered'))
  })

  tap.test('match one type', assert => {
    assert.plan(1)

    new Simon((resolve, reject) => reject('foo'))
      .catch('foo', error => assert.equal(error, 'foo'))
      .catch(_ => assert.fail('this should not be triggered'))
  })

  tap.test('no match', assert => {
    assert.plan(1)

    new Simon((resolve, reject) => reject('foo'))
      .catch('bar', _ => assert.fail('this should not be triggered'))
      .catch(error => assert.equal(error, 'foo'))
  })

  tap.test('multiple matches', assert => {
    assert.plan(1)

    new Simon((resolve, reject) => reject('bar'))
      .catch(Error, 'foo', 'bar', error => assert.equal(error, 'bar'))
      .catch(_ => assert.fail('this should not be triggered'))
  })

  tap.test('immediate invocation', assert => {
    assert.plan(1)

    Simon.reject('bar')
      .catch('foo', 'bar', error => assert.equal(error, 'bar'))
      .catch(_ => assert.fail('this should not be triggered'))
  })
})
