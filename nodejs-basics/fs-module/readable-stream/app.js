const { createReadStream } = require('fs')

const readableStream = createReadStream('./szamármese.txt', {
  encoding: 'utf8',
  highWaterMark: 11
})

readableStream.on('data', (chunk) => {
  // console.log(chunk) - egyszerre 11 bájtnyi adatot ír ki sortöréssel. Helyette:
  process.stdout.write(chunk) // standard output == konzol-stream, formázás nélkül.
})
