const Movie = require('../models/movie');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const movieNotFoundError = new NotFoundError('Фильм не найден');

module.exports.getMovies = (_req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((movie) => movie.populate('owner'))
    .then((populatedMovie) => res.send(populatedMovie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findOne({ movieId: req.params.movieId })
    .orFail(movieNotFoundError)
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.deleteOne({ movieId: movie.movieId })
          .then(res.send({ message: 'Фильм удален' }));
      } else {
        throw new ForbiddenError('Запрещено удалять фильмы чужих пользователей');
      }
    })
    .catch(next);
};
