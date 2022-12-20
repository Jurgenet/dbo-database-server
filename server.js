const { debug } = require('console')
const http = require('http')
const app = require('./app')

require('dotenv').config()

const PORT = process.env.PORT || '3000'

app.set('port', PORT)

const server = http.createServer(app)

server.on('error', onError)
server.on('listening', onListening)

server.listen(PORT)

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${PORT}`

  switch (error.code) {
    case 'EACCESS':
      console.error(`${bind} requires elevated privilages`)
      process.exit(1)
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
    default:
      throw error
  }
}

function onListening () {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${PORT}`
  debug(`Listening on ${bind}`)
}
