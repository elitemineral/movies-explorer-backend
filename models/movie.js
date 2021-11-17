const validator = require('validator');
const mongoose = require('mongoose');

const { dataModels } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  director: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  duration: {
    type: Number,
    min: 1,
    required: true,
  },
  year: {
    type: String,
    length: 4,
    required: true,
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 100,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: (props) => `${props.value} некорректная ссылка`,
    },
    required: true,
  },
  trailer: {
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: (props) => `${props.value} некорректная ссылка`,
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: (props) => `${props.value} некорректная ссылка`,
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: dataModels.user,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    minlength: 2,
    maxlength: 100,
    required: true,
  },
  nameEN: {
    type: String,
    minlength: 2,
    maxlength: 100,
    required: true,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model(dataModels.movie, movieSchema);
