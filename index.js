'use strict'

function isInstance (error, types) {
  if (typeof error !== 'object') {
    return false
  }

  return types.some(type => {
    switch (typeof type) {
      // error classes
      case 'function':
        return error instanceof type

      // named errors
      case 'string':
        return error.name === type
    }

    return false
  })
}

function isRegExpMatch (error, matches) {
  // if we're testing an error object, try to match against the message
  if (typeof error === 'object' && error.message) {
    error = error.message
  }

  if (typeof error !== 'string') {
    return false
  }

  return matches.some(match => {
    if (match instanceof RegExp) {
      return match.test(error)
    }

    if (typeof match === 'string') {
      return new RegExp(match).test(error)
    }

    return false
  })
}

module.exports = class Smart extends Promise {
  catch () {
    // need at least 2
    if (arguments.length < 2) {
      return super.then.bind(this, null).apply(this, arguments)
    }

    let args = Array.from(arguments)
    let handler = args.pop()

    // we can't process this
    if (typeof handler !== 'function') {
      return super.catch.apply(this, arguments)
    }

    return super.then(null, error => {
      // string handling
      if (isRegExpMatch(error, args)) {
        return super.then(null, handler)
      }

      // error objects
      if (isInstance(error, args)) {
        return super.then(null, handler)
      }

      // everything else
      if (args.indexOf(error) > -1) {
        return super.then(null, handler)
      }

      // throw back
      throw error
    })
  }
}
