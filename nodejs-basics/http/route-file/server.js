// http://127.0.0.1 - index.html
// http://127.0.0.1/about - about.html
// http://127.0.0.1/contact - contact.html

const http = require('http')
const router = require('./router/router')
const port = 8080

http.createServer(({ url }, res) => {
  router[url] ? router[url](res) : router['/404'](res)
}).listen(port)

console.log(`Server is running at http://127.0.0.1:${port}`)
