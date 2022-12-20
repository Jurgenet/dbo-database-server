const mongoose = require('mongoose')

const collectionName = 'accounts'
const documentName = 'account'
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
    group: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    login: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
  },
)

module.exports = mongoose.model(documentName, documentSchema, collectionName)
