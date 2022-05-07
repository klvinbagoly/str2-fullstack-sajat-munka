const { createReadStream, createWriteStream } = require('fs')

const readableStream = createReadStream('./szamármese.txt', {
  encoding: 'utf8',
  highWaterMark: 11
})

const writeableStream = createWriteStream('./szamármeseCopy.txt')

readableStream.pipe(writeableStream)
