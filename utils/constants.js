const dataModels = {
  user: 'user',
  movie: 'movie',
};

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://51.250.10.206',
    'http://best-movies-explorer.nomoredomains.rocks',
    'https://best-movies-explorer.nomoredomains.rocks',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin'],
  credentials: true,
};

const resMessages = {
  successfulAuth: 'Авторизация прошла успешно',
  successfulLogout: 'Выход осуществлен',
  moviedDeleted: 'Фильм удален',
};

const errMessages = {
  failedAuth: 'С токеном что-то не так',
  incorrectUrl: 'Неправильный формат url',
  incorrectEmail: 'Неправильный формат email',
  incorrectLoginInfo: 'Неверные почта или пароль',
  movieForbidden: 'Запрещено удалять фильмы чужих пользователей',
  movieNotFound: 'Фильм не найден',
  pageNotFound: 'Запрашиваемая страница не найдена',
  duplicateEmail: 'Пользователь с таким email уже существует',
  serverError: 'На сервере произошла ошибка',
};

module.exports = {
  dataModels,
  corsOptions,
  resMessages,
  errMessages,
};
