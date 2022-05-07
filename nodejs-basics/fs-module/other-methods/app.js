/* eslint-disable no-unused-vars */
const {
  unlinkWrapper,
  renameWrapper,
  copyFileWrapper,
  statWrapper,
  chmodWrapper
} = require('./utils')

// unlinkWrapper({ path: './szamármese.txt' })

// renameWrapper({
//   oldpath: './poets.txt',
//   newpath: './koltok.txt'
// })

// copyFileWrapper({
//   src: './koltok.txt',
//   dest: './lists/poets.txt'
// })

// statWrapper({
//   path: './lists/poets.txt',
//   callback (err, stats) {
//     if (err) throw err
//     console.log(stats)
//   }
// })

chmodWrapper({
  path: './lists/poets.txt',
  mode: 0o744
})
