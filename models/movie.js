const validator = require('validator');
const mongoose = require('mongoose');

const { dataModels } = require('../utils/constants');
const { errMessages } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
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
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: (props) => `${props.value} ${errMessages.incorrectUrl}`,
    },
    required: true,
  },
  trailer: {
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: (props) => `${props.value} ${errMessages.incorrectUrl}`,
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: (props) => `${props.value} ${errMessages.incorrectUrl}`,
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
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model(dataModels.movie, movieSchema);
