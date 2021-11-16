const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат ссылки');
  }

  return value;
};

const newUserInfoValidator = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const userInfoValidator = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const loginInfoValidator = () => celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const newMovieInfoValidator = () => celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required().min(1),
    year: Joi.string().required().length(4),
    description: Joi.string().required().min(10).max(100),
    image: Joi.string().custom(validateURL),
    trailer: Joi.string().custom(validateURL),
    thumbnail: Joi.string().custom(validateURL),
    movieId: Joi.string().alphanum().length(24).hex(),
    nameRU: Joi.string().required().min(2).max(100),
    nameEN: Joi.string().required().min(2).max(100),
  }),
});

const movieIdValidator = () => celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24).hex(),
  }),
});

module.exports = {
  newUserInfoValidator,
  userInfoValidator,
  loginInfoValidator,
  newMovieInfoValidator,
  movieIdValidator,
};
