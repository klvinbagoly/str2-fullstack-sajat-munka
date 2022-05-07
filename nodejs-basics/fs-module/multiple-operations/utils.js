const fs = require('fs')

const printAndTruncateFile = (file, length, bufferSize) => {
  fs.open(file, 'r+', (err, fd) => { // Megnyitjuk a fájlt írás, olvasás engedéllyel.
    if (err) throw err
    fs.ftruncate(fd, length, (err) => { // fd a fájl azonosítója, length a levágott rész hossza
      if (err) throw err
      const buffer = Buffer.alloc(bufferSize) // Lefoglal egy ekkora memóriaterületet.
      fs.read(fd, buffer, 0, buffer.length, 0, (err, bytes) => {
        if (err) throw err
        if (bytes > 0) console.log(buffer.slice(0, bytes).toString())
        fs.close(fd, (err) => {
          if (err) throw err
        })
      })
    })
  })
}

module.exports = printAndTruncateFile
