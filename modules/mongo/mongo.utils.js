const exec  = require('child_process').exec
const path = require("path")
const mongoose = require('mongoose')
require('dotenv').config()

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

function connectToDatabase ({ isLocalDatabase = true } = {}) {
  const mongoUri = isLocalDatabase ? process.env.MONGODB_URI_SERVER : process.env.MONGODB_URI_ATLAS

  mongoose
    .connect(mongoUri, mongoOptions)
    .then(() => {
      console.log('Connected to database!')
    })
    .catch((error) => {
      if (error.name === 'MongooseServerSelectionError') {
        console.log(`${error.name} :: ${error.message}`)
        console.log('Run mongodb server process!')
      } else {
        console.log('Connection failed!')
        console.log(error)
      }
    })
}

function generateDocId () {
  return new mongoose.Types.ObjectId()
}

function createDump ({ stump = _createStump(), databaseName = 'test' } = {}) {
  return new Promise((resolve, reject) => {
    const tool = path.join(__dirname, 'mongodump.exe')
    const database = `-d ${databaseName}`
    const uri = process.env.MONGODB_TOOLS_CONNECTION
    const dump = path.join(process.env.MONGODB_BACKUP_FOLDER, process.env.SERVER_NAME, stump)

    const child = exec(`${tool} ${database} -o ${dump} ${uri}`)

    if (child.stdout) {
      child.stdout.pipe(process.stdout)
    }

    if (child.stderr) {
      child.stderr.pipe(process.stderr)
    }

    child.on('exit', (code) => {
      if (code !== 0) {
        reject()
        return
      }

      resolve(dump)
    })
  })
}

function _createStump () {
  const _addPadStart = (num) => String(num).padStart(2, '0')

  const now = new Date()
  const day = _addPadStart(now.getDate())
  const month = _addPadStart(now.getMonth() + 1)
  const year = now.getFullYear()
  const hours = _addPadStart(now.getHours())
  const minutes = _addPadStart(now.getMinutes())
  const seconds = _addPadStart(now.getSeconds())

  return `${day}.${month}.${year}--${hours}.${minutes}.${seconds}`
}

module.exports = {
  connectToDatabase,
  generateDocId,
  createDump,
}
