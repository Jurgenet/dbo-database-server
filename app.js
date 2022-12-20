const express = require('express')
const bodyParser = require('body-parser')
const { connectToDatabase } = require('./modules/mongo/mongo.utils')

const app = express()

connectToDatabase()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  next()
})

app.use(require('./modules/resources/system/system.router'))
app.use(require('./modules/resources/markers/markers.router'))
app.use(require('./modules/resources/accounts/accounts.router'))
app.use(require('./modules/resources/notes/notes.router'))
app.use(require('./modules/resources/orders/orders.router'))
app.use(require('./modules/resources/knowledges/knowledges.router'))

module.exports = app
