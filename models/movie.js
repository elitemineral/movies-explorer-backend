const validator = require('validator');
const mongoose = require('mongoose');

const { dataModels } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country : {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, 'Страна создания обязательна'],
  },
  director : {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, 'Режиссер обязателен'],
  },
  duration : {
    type: Number,
    min: 1,
    required: [true, 'Длительность обязательна'],
  },
  year : {
    type: String,
    length: 4,
    required: [true, 'Год обязателен'],
  },
  description : {
    type: String,
    minlength: 10,
    maxlength: 100,
    required: [true, 'Описание обязательно'],
  },
  image: {
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: (props) => `${props.value} некорректная ссылка`,
    },
    required: [true, 'Ссылка на постер обязательна'],
  },
  trailer: {
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: (props) => `${props.value} некорректная ссылка`,
    },
    required: [true, 'Ссылка на трейлер обязательна'],
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (value) => validator.isURL(value),
      message: (props) => `${props.value} некорректная ссылка`,
    },
    required: [true, 'Ссылка на мини-постер обязательна'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: dataModels.user,
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  nameRU : {
    type: String,
    minlength: 2,
    maxlength: 100,
    required: [true, 'Название на русском обязательно'],
  },
  nameEN : {
    type: String,
    minlength: 2,
    maxlength: 100,
    required: [true, 'Название на английском обязательно'],
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model(dataModels.movie, movieSchema);
