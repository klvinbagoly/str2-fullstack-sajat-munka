const { writeFile, appendFile } = require('fs')

const fileCallback = (err) => {
  if (err) throw err
  console.log('File content changed.')
}

const writeFileWrapper = (path, data) => {
  writeFile(path, data, fileCallback)
}

const appendFileWrapper = (path, data) => {
  appendFile(path, data, fileCallback)
}

module.exports = {
  writeFileWrapper,
  appendFileWrapper
}
