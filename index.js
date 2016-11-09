module.exports = class Smart extends Promise {
  catch (...args) {
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

      if (args.length === 0 || args.includes(error)) {
        return this.then(null, handler)
      } else {
        throw error
      }
    })
  }
}
