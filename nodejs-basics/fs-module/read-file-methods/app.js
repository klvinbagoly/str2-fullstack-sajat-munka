const { readFileSyncLog, readFileLog } = require('./utils')

readFileSyncLog('./szamármese.txt', { encoding: 'utf-8' })
readFileLog('./szamármese.txt', { encoding: 'utf-8' })
