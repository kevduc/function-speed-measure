const fs = require('fs')

const verbose = false

const f1 = (delta) => delta.reduce((squareSum, value) => squareSum + value ** 2, 0)
const f2 = (delta) => delta[0] ** 2 + delta[1] ** 2 + delta[2] ** 2

const Nstart = 0
const Nend = 200000
const Nlength = Nend - Nstart + 1

const input = Array.from({ length: Nend }, () => [Math.random(), Math.random(), Math.random()].map((v) => Math.floor(256 * v)))

const X = Array.from({ length: Nlength }, (_, idx) => idx + Nstart)
const Y = X.map((x) => ({
  N: x,
  f1: measure(f1, input, x, 'f1', verbose),
  f2: measure(f2, input, x, 'f2', verbose),
}))

fs.writeFileSync('y.json', JSON.stringify(Y))

// Helper functions

function measure(f, inputs, inputsSize, label, verbose) {
  const start = new Date().getTime()
  for (let i = 0; i < inputsSize; i++) {
    const result = f(inputs[i])
  }
  const end = new Date().getTime()
  const time = end - start
  if (verbose) console.log(`${label}: ${time} ms`)
  return time
}
