const express = require('express')
const mongoUtils = require('../../mongo/mongo.utils')

const apiRoute = '/api/system'

const router = express.Router()

router.get(`${apiRoute}/ping`, function (req, res, next) {
  res
    .status(200)
    .json({ message: 'ping? pong!' })
})

router.get(`${apiRoute}/backup`, async function (req, res, next) {
  try {
    const dump = await mongoUtils.createDump()
    res
      .status(201)
      .json({ message: 'backup created successfully', dump })
  } catch (error) {
    console.log('error', error)
    res
      .status(500)
      .json({ message: 'backup failed' })
  }
})

module.exports = router
