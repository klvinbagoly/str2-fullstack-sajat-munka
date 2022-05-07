const sum = (a, b) => {
  if (Number.isFinite(a) && Number.isFinite(b)) {
    return a + b
  }
  throw new Error('One or more parameters are not numbers.')
}

module.exports = sum
