const mongoose = require('mongoose')

const collectionName = 'orders'
const documentName = 'order'
const documentSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
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
    price: {
      type: Number,
      required: false,
      default: 0.0,
    },
    amount: {
      type: Number,
      required: false,
      default: 1,
    },
    vendor: {
      type: String,
      required: false,
      default: '',
    },
    seller: {
      type: String,
      required: false,
      default: '',
    },
    tags: {
      type: Array,
      required: false,
      default: [],
    },
    link: {
      type: String,
      required: false,
      default: '',
    },
    text: {
      type: String,
      required: false,
      default: '',
    },
  },
)

module.exports = mongoose.model(documentName, documentSchema, collectionName)
