'use strict'

function isInstance (object, types) {
  if (typeof object !== 'object') {
    return false
  }

  return types.some(type => {
    switch (typeof type) {
      // error classes
      case 'function':
        return object instanceof type

      // named errors
      case 'string':
        return object.name === type
    }

    return false
  })
}

function isRegExpMatch (string, matches) {
  if (typeof string !== 'string') {
    return false
  }

  return matches.some(match => {
    if (match instanceof RegExp) {
      return match.test(string)
    }

    if (typeof match === 'string') {
      return new RegExp(match).test(string)
    }

    return false
  })
}

module.exports = class Smart extends Promise {
  catch () {
    // need at least 2
    if (arguments.length < 2) {
      return super.then.call(this, null, ...arguments)
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
