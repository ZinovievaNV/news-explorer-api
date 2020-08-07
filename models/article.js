const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  link: {
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Введите ссылку!',
    },
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  image: {
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Введите ссылку!',
    },
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('article', articleSchema);
