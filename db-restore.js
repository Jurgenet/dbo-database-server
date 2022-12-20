const exec  = require('child_process').exec
const path = require("path")

require('dotenv').config()

function restoreDump (pathToDump = process.env.DUMP, databaseName = 'test') {
  const tool = path.join(__dirname, 'modules', 'mongo', 'mongorestore.exe')
  const database = `-d ${databaseName}`
  const uri = process.env.MONGODB_TOOLS_CONNECTION

  const child = exec(`${tool} ${database} ${uri} --drop ${pathToDump}`)

  if (child.stdout) {
    child.stdout.pipe(process.stdout)
  }

  if (child.stderr) {
    child.stderr.pipe(process.stderr)
  }

  child.on('exit', (code) => {
    if (code !== 0) {
      return
    }
  })
}

restoreDump()
