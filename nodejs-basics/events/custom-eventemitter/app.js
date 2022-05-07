const EventEmitter = require('./event-emitter')

const eventEmitter = new EventEmitter()
eventEmitter.on('speak', () => console.log('Zombie says "Grrr".'))
eventEmitter.on('speak', () => console.log('Hungry Zombie says "Harr harr".'))
eventEmitter.on('walk', () => console.log('Dead are walking!'))

eventEmitter.emit('speak')
eventEmitter.emit('walk')
console.log(eventEmitter.events)
console.log(eventEmitter.events.constructor)
console.log(eventEmitter.events[0])
