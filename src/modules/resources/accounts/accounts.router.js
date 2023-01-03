const express = require('express')

// utils
const { createDocumentController } = require('../../../modules/mongo/mongo.controller.fabrics')

const docModel = require('./accounts.model')

const apiRoute = '/api/accounts'

const router = express.Router()
const docController = createDocumentController(docModel)

// routes
router.get(apiRoute, docController.createMethodGetAllDocuments('_id title markers group email login password link text'))
router.post(apiRoute, docController.createMethodCreateDocument(['title', 'markers', 'group', 'email', 'login', 'password', 'link', 'text']))
router.get(`${apiRoute}/:id`, docController.createMethodGetDocumentById())
router.patch(`${apiRoute}/:id`, docController.createMethodUpdateDocument())
router.delete(`${apiRoute}/:id`, docController.createMethodDeleteDocument())

module.exports = router
