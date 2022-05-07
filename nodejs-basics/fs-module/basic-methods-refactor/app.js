const { writeFile, appendFile } = require('fs')
const { fileHandlerWrapper } = require('./utils')

fileHandlerWrapper({
  method: writeFile,
  path: './szamármese.txt',
  data: 'SZAMÁRMESE'
})
fileHandlerWrapper({
  method: appendFile,
  path: './poets.txt',
  data: 'Romhányi a Rímhányó'
})
