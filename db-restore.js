const exec  = require('child_process').exec
const path = require('path')
const { dbToolsConnectionUrl, dbDumpPath } = require('./config')

function restoreDump (pathToDump = dbDumpPath, databaseName = 'test') {
  const tool = path.join(__dirname, 'modules', 'mongo', 'mongorestore.exe')
  const database = `-d ${databaseName}`

  const child = exec(`${tool} ${database} ${dbToolsConnectionUrl} --drop ${pathToDump}`)

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
