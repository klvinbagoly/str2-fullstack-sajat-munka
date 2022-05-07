const fs = require('fs')

const sr = fs.ReadStream('./szamármese.txt', { encoding: 'utf-8', highWaterMark: 1 })
sr.on('data', (chunk) => { process.stdout.write(chunk + ' ') })
const sw = fs.WriteStream('./szamarmese2.txt', { encoding: 'utf-8' })
sr.on('data', (chunk) => { sw.write(chunk + ' ') })
