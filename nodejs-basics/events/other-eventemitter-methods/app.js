const EventEmitter = require('events')

const eventEmitter = new EventEmitter()

const scream = () => console.log('I hear a scream!')

const tooLateToHelp = () => console.log('Too late, she is dead.')

const describeTheMurderer = ({ height, hairColor }) =>
  console.log(`Height: ${height}, hair color: ${hairColor}`)

eventEmitter.on('scream', scream)
eventEmitter.on('scream', tooLateToHelp)
eventEmitter.once('witness', describeTheMurderer)

eventEmitter.emit('scream')
eventEmitter.emit('scream')
eventEmitter.emit('witness', { height: '180cm', hairColor: 'black' })
eventEmitter.emit('witness', { height: '180cm', hairColor: 'black' })
// .once() esetén csak az első hívás fut le.
eventEmitter.off('scream', tooLateToHelp)
eventEmitter.emit('scream')
