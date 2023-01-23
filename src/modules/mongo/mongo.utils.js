const exec  = require('child_process').exec
const path = require('path')
const mongoose = require('mongoose')
const {
  serverName,
  dbConnectionUrl,
  dbToolsConnectionUrl,
  dbBackupFolder,
} = require('../../config')

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

function createDbConnection ({ isLocalDatabase = true } = {}) {
  console.log('Db connection url:', dbConnectionUrl)

  mongoose.connect(dbConnectionUrl, mongoOptions)

  return mongoose.connection
}

function generateDocId () {
  return new mongoose.Types.ObjectId()
}

function createDump ({ stump = _createStump(), databaseName = 'test' } = {}) {
  return new Promise((resolve, reject) => {
    const tool = path.join(__dirname, 'mongodump.exe')
    const database = `-d ${databaseName}`
    const dump = path.join(dbBackupFolder, serverName, stump)

    const child = exec(`${tool} ${database} -o ${dump} ${dbToolsConnectionUrl}`)

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
  createDbConnection,
  generateDocId,
  createDump,
}
