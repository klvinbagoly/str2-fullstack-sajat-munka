const { resolve, join } = require('path')

console.log(resolve()) // Hol vagyunk a terminálban (abszolút).
console.log(join()) // Összefűz útvonalakat (relatív)
console.log(__dirname) // A fájl absz. elérési útvonala.

console.log(resolve('./szamármese.txt')) // A terminál útvonalához képest.
// Ezt használják az fs függvények.
console.log(join('./szamármese.txt'))
console.log(join(__dirname, './szamármese.txt'))
