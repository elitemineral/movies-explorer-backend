const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  newMovieInfoValidator,
  movieIdValidator,
} = require('../utils/requestValidators');

router.get('/movies', getMovies);
router.post('/movies', newMovieInfoValidator(), createMovie);
router.delete('/movies/:movieId', movieIdValidator(), deleteMovie);

module.exports = router;
