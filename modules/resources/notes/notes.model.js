const mongoose = require('mongoose')

const collectionName = 'notes'
const documentName = 'note'
const documentSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: {
      type: String,
      required: true,
    },
    markers: {
      type: Array,
      required: true,
    },
    isPinned: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
    },
    links: {
      type: Array,
      required: false,
    },
  },
)

module.exports = mongoose.model(documentName, documentSchema, collectionName)
