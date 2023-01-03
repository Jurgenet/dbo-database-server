const mongoose = require('mongoose')

const collectionName = 'knowledges'
const documentName = 'knowledge'
const documentSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    type: {
      type: String,
      required: false,
      default: '',
    },
    date: {
      type: String,
      required: false,
      default: '',
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
    platform: {
      type: String,
      required: false,
      default: '',
    },
    author: {
      type: String,
      required: false,
      default: '',
    },
    lang: {
      type: String,
      required: false,
      default: '',
    },
    markers: {
      type: Array,
      required: false,
      default: [],
    },
    cover: {
      type: String,
      required: false,
      default: '',
    },
    location: {
      type: String,
      required: false,
      default: '',
    },
    link: {
      type: String,
      required: false,
      default: '',
    },
    isActive: {
      type: String,
      required: false,
      default: 'false',
    },
    isDone: {
      type: String,
      required: false,
      default: 'false',
    },
    isOnline: {
      type: String,
      required: false,
      default: 'false',
    },
    text: {
      type: String,
      required: false,
      default: '',
    },
  },
)

module.exports = mongoose.model(documentName, documentSchema, collectionName)
