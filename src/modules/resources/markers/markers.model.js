const mongoose = require('mongoose')

const collectionName = 'markers'
const documentName = 'marker'
const documentSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: {
      type: String,
      required: false,
      default: '',
    },
    group: {
      type: String,
      required: false,
      default: '',
    },
    textColor: {
      type: String,
      required: false,
      default: '',
    },
    bgColor: {
      type: String,
      required: false,
      default: '',
    },
  },
)

module.exports = mongoose.model(documentName, documentSchema, collectionName)
