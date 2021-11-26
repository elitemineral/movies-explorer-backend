const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  newMovieInfoValidator,
  idValidator,
} = require('../middlewares/requestValidators');

router.get('/movies', getMovies);
router.post('/movies', newMovieInfoValidator, createMovie);
router.delete('/movies/:movieId', idValidator, deleteMovie);

module.exports = router;
