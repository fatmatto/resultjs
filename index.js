/**
 * A construct to better handle errors in Javascript code.
 */
class Result {
  constructor (error = null, value = null) {
    this.error = error
    this.value = value
  }

  /**
   * Returns the actual value or throws error if error is present
   * @returns {*}
   */
  unwrap () {
    if (this.error) {
      throw this.error
    } else {
      return this.value
    }
  }

  /**
   * Returns the actual value or optional
   * @param {any} optional
   * @returns
   */
  unwrapOr (optional) {
    if (this.error) {
      return optional
    } else {
      return this.value
    }
  }

    /**
   * Returns the actual value or runs the callback
   * @param {Function} callback
   * @returns
   */
  unwrapOrElse (fn) {
    if (typeof fn !== 'function') {
      throw new Error('unwrapOrElse expects a function as parameter')
    }
    if (this.error) {
      return fn()
    } else {
      return this.value
    }
  }

  /**
   * Returns true if result has a value
   * @returns {Boolean}
   */
  isOk () {
    return !(this.error)
  }

  /**
   * Returns true if result has error
   * @returns {Boolean}
   */
  isError () {
    return !!(this.error)
  }

  /**
   * Returns an array where the first element is the error and the second the value
   * @returns {Array}
   */
  toArray () {
    return [this.error, this.value]
  }

  /**
   *
   * @param {Any} valueOrError Creates a result from a value which can be an error or not
   * @returns {Result}
   */
  static from (valueOrError) {
    if (valueOrError instanceof Error) {
      return new Result(valueOrError, null)
    } else {
      return new Result(null, valueOrError)
    }
  }
}

/**
 * Wraps an async function, returning errors and results in a nice way
 * @param {Function} fn
 * @returns {Promise<Result>} The promise of a result (very romantic!)
 */
async function wrap (fn) {
  try {
    const result = await fn()
    return Result.from(result)
  } catch (error) {
    return Result.from(error)
  }
}

/**
 * Wraps a sync function, returning errors and results in a nice way
 * @param {Function} fn
 * @returns {Function} An async function that applies params to the given function and returns a Result instance
 */
function wrapSync (fn) {
  try {
    const result = fn()
    return Result.from(result)
  } catch (error) {
    return Result.from(error)
  }
}

function ok (v) { return new Result(null, v) }

function err (e) { return new Result(e) }

module.exports = { Result, wrap, wrapSync, ok, err }
