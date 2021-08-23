## Result Monad

Convenient way to handle functions that might return errors without throwing. Heavily inspired by Rust and Golang.

### Usage

```javascript

const {wrap} = require('@fatmatto/resultjs')

// Wrap an async function that might throw
const wrapped = wrap(params => mightFailAsync(params))

// Wrap a sync function
const wrappedSync = wrapSync(params => mightFail(params))

const result = await wrapped(someParams)

if (result.isError()) {
  // True if result holds an error
}

if (result.isOk()) {
  // True if result does not holds an error but holds a value
}

// Throws if result holds an error or returns the value if it contains a value
const value = result.unwrap()

// Returns the value if result holds the value, or the backup value if it holds an error
const altValue = result.unwrapOr('someBackupValue')

// Turns the Result instance into an array
const [error, value] = result.toArray()

if (error) { 
  // handle the error
}

// Destructuring values
const {error,value} = result


const mightBeAnError = someFunction()

// Create a Result instance from a value which might be an error
const result = Result.from(mightBeAnError)
if (result.isError()) {
  // handle error
}

// Shortcut for new Result(null,v)
const result = ok(imSureThisIsAGoodValue)

// Shortcut for new Result(error,null)
const result = err(error)


```


