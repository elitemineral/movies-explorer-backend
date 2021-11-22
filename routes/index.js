const router = require('express').Router();

const auth = require('../middlewares/auth');
const { login, logout, createUser } = require('../controllers/users');

const usersRouter = require('./users');
const moviesRouter = require('./movies');

const {
  loginInfoValidator,
  newUserInfoValidator,
} = require('../middlewares/requestValidators');

const NotFoundError = require('../errors/NotFoundError');
const { errMessages } = require('../utils/constants');

router.post('/signup', newUserInfoValidator, createUser);
router.post('/signin', loginInfoValidator, login);
router.get('/logout', logout);

router.use(
  auth,
  usersRouter,
  moviesRouter,
  (_req, _res, next) => next(new NotFoundError(errMessages.pageNotFound)),
);

module.exports = router;
