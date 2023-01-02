const { debug } = require('console')
const http = require('http')
const app = require('./app')
const { createDbConnection } = require('./modules/mongo/mongo.utils')
const { port } = require('./config')

app.set('port', port)

createDbConnection()
  .on('error', console.error.bind(console, 'connection error:'))
  .on('disconnected', createDbConnection)
  .once('open', () => {
    console.log('Connected to database successfully')
    startServer()
  })

function startServer () {
  const server = http.createServer(app)

  server.on('error', () => {
    if (error.syscall !== 'listen') {
      throw error
    }

    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${port}`

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
  })
  server.on('listening', () => {
    const addr = server.address()
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${port}`
    debug(`Started db service on ${bind}`)
  })

  server.listen(port)
}
