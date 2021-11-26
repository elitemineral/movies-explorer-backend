const Movie = require('../models/movie');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const { resMessages, errMessages } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError(errMessages.movieNotFound))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id.toString()) {
        return movie.remove()
          .then(() => res.status(200).send({ message: resMessages.moviedDeleted }));
      }

      throw new ForbiddenError(errMessages.movieForbidden);
    })
    .catch(next);
};
