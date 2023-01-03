const { generateDocId } = require('./mongo.utils')

function createDocumentController (documentModel) {
  return {
    createMethodGetAllDocuments: (selectPropsString) => createMethodGetAllDocuments(documentModel, selectPropsString),
    createMethodGetDocumentById: () => createMethodGetDocumentById(documentModel),
    createMethodCreateDocument: (modelProps) => createMethodCreateDocument(documentModel, modelProps),
    createMethodUpdateDocument: () => createMethodUpdateDocument(documentModel),
    createMethodDeleteDocument: () => createMethodDeleteDocument(documentModel),
  }
}

function createMethodGetAllDocuments (documentModel, selectPropsString = '') {
  return function (req, res, next) {
    documentModel
      .find()
      .select(selectPropsString) // if empty string - return all fields of doc
      .sort({ isPinned: -1 })
      .exec()
      .then((docs) => {
        res
          .status(200)
          .json({
            message: 'Fetched successfully',
            count: docs.length,
            result: docs,
          })
      })
      .catch((error) => {
        res
          .status(500)
          .json({ message: error })
      })
    }
}

function createMethodGetDocumentById (documentModel) {
  return function (req, res, next) {
    const id = req.params.id

    documentModel
      .findById({ _id: id })
      .exec()
      .then((doc) => {
        if (doc) {
          res
            .status(200)
            .json({
              message: 'Fetched seccessfully',
              result: doc,
            })
        } else {
          res
            .status(404)
            .json({
              message: 'No valid entry found for provided ID',
            })

        }
      })
      .catch((error) => {
        res
          .status(500)
          .json({ message: error })
      })
  }
}

function createMethodCreateDocument (documentModel, modelProps = []) {
  return function (req, res, next) {
    let modelPropsObject = {}

    if (modelProps.length > 0) {
        modelProps.forEach((propName) => modelPropsObject[propName] = req.body[propName] || '')
    } else {
        modelPropsObject = req.body
    }


    const document = new documentModel({
      _id: generateDocId(),
      ...modelPropsObject,
    })

    document
      .save()
      .then((doc) => {
        res
          .status(201)
          .json({
            message: 'Created successfully',
            result: doc,
          })
      })
      .catch((error) => {
        res
          .status(500)
          .json({ message: error })
      })
    }
}

function createMethodUpdateDocument (documentModel) {
  return function (req, res, next) {
    const id = req.params.id

    documentModel
      .updateOne({ _id: id }, { $set: req.body })
      .exec()
      .then((result) => {
        res
          .status(200)
          .json({
            message: 'Updated successfully',
            result,
          })
      })
      .catch((error) => {
        res
          .status(500)
          .json({ message: error })
      })
  }
}

function createMethodDeleteDocument (documentModel) {
  return function (req, res, next) {
    const id = req.params.id

    documentModel
      .deleteOne({ _id: id })
      .exec()
      .then((result) => {
        res
          .status(200)
          .json({
            message: 'Removed successfully',
            result,
          })
      })
      .catch((error) => {
        res
          .status(500)
          .json({ message: error })
      })
  }
}

module.exports = {
  createDocumentController,
  createMethodGetAllDocuments,
  createMethodGetDocumentById,
  createMethodCreateDocument,
  createMethodUpdateDocument,
  createMethodDeleteDocument,
}
