const os = require('os')

console.log('Platform:', os.platform())
console.log('Architecture:', os.arch())
console.log('OS version:', os.version())
console.log('OS build number:', os.release())
// console.log('Processors:', os.cpus()) // egy tömbben adja vissza
console.log('Processor model:', os.cpus()[0].model)
console.log('Total memory size in bytes:', os.totalmem())
console.log('Total memory size in GB-s:', (os.totalmem() / 1024 / 1024 / 1024).toFixed(2))
console.log('Free memory size in GB-s:', (os.freemem() / 1024 / 1024 / 1024).toFixed(2))

console.log('---User Info---')
console.log('User name:', os.userInfo().username)
console.log('IP address:', os.networkInterfaces()['vEthernet (WSL)'][1].address)
