const { unlink, rename, copyFile, stat, chmod } = require('fs')

const fileHandlerCallback = (err) => {
  if (err) throw err
  console.log('File process successful!')
}

const unlinkWrapper = ({ path, callback = fileHandlerCallback } = {}) => {
  unlink(path, callback)
}

const renameWrapper = ({ oldpath, newpath, callback = fileHandlerCallback } = {}) => {
  rename(oldpath, newpath, callback)
}

const copyFileWrapper = ({ src, dest, callback = fileHandlerCallback } = {}) => {
  copyFile(src, dest, callback)
}

const statWrapper = ({ path, callback = fileHandlerCallback } = {}) => {
  stat(path, callback)
}

// mode számjegyei: tulajdonos, csoport többi tagja, egyéb userek jogosultsága.
// READ: 4, WRITE: 2, EXECUTE: 1 pont
// 777
const chmodWrapper = ({ path, mode, callback = fileHandlerCallback } = {}) => {
  chmod(path, mode, callback)
}

module.exports = {
  unlinkWrapper,
  renameWrapper,
  copyFileWrapper,
  statWrapper,
  chmodWrapper
}
