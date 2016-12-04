'use strict'

module.exports = class Smart extends Promise {
  catch () {
    let args = Array.from(arguments)
    let handler = args.pop()

    if (typeof handler !== 'function') {
      return this
    }

    return this.then(null, error => {
      if (typeof error === 'object') {
        if (args.some(arg => typeof arg === 'function' && error instanceof arg)) {
          return this.then(null, handler)
        }
      }

      if (args.length === 0 || args.indexOf(error) > -1) {
        return this.then(null, handler)
      } else {
        throw error
      }
    })
  }
}
