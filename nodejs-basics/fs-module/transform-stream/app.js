const { createReadStream, createWriteStream } = require('fs')
const { createGzip } = require('zlib')

const readableStream = createReadStream('./szamármese.txt', {
  encoding: 'utf8',
  highWaterMark: 11
})

const writeableStream = createWriteStream('./szamármeseCopy.txt')
const createCompressedFile = createWriteStream('./szamármese.txt.gz')

readableStream.pipe(writeableStream)

readableStream
  .pipe(createGzip())
  .pipe(createCompressedFile)
