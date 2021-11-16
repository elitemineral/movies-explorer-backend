const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  loginInfoValidator,
  newUserInfoValidator,
} = require('./utils/requestValidators');

const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');

const auth = require('./middlewares/auth');
const errors = require('./middlewares/celebrateErrorHandler');

const { login, logout, createUser } = require('./controllers/users');
const { statusCodes, corsOptions } = require('./utils/constants');

const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

const app = express();

app.use(requestLogger);

app.use('*', cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginInfoValidator(), login);
app.post('/signup', newUserInfoValidator(), createUser);
app.get('/logout', logout);

app.use('/', auth, usersRouter, moviesRouter);
app.use((_req, _res, next) => next(new NotFoundError('Запрашиваемая страница не найдена')));

app.use(errorLogger);
app.use(errors);

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  const { statusCode = statusCodes.serverError, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === statusCodes.serverError
        ? 'На сервере произошла ошибка'
        : message,
    });
});

mongoose.connect('mongodb://localhost:27017/moviesdb')
  .then(() => app.listen(PORT, () => console.log(`App listening on port ${PORT}`)))
  .catch((err) => console.log(err));
