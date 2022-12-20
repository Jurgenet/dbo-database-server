const express = require('express')

// utils
const { createDocumentController } = require('../../../modules/mongo/mongo.controller.fabrics')

const docModel = require('./knowledges.model')

const apiRoute = '/api/knowledges'

const router = express.Router()
const docController = createDocumentController(docModel)
const fields = [
  'type',
  'date',
  'title',
  'platform',
  'author',
  'lang',
  'markers',
  'cover',
  'location',
  'link',
  'isActive',
  'isDone',
  'isOnline',
  'text',
]

// routes
router.get(apiRoute, docController.createMethodGetAllDocuments())
router.post(apiRoute, docController.createMethodCreateDocument(fields))
router.get(`${apiRoute}/:id`, docController.createMethodGetDocumentById())
router.patch(`${apiRoute}/:id`, docController.createMethodUpdateDocument())
router.delete(`${apiRoute}/:id`, docController.createMethodDeleteDocument())

module.exports = router
