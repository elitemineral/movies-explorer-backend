const dataModels = {
  user: 'user',
  movie: 'movie',
};

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://51.250.3.113',
    'http://best-movies-explorer.nomoredomains.rocks',
    'https://best-movies-explorer.nomoredomains.rocks',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin'],
  credentials: true,
};

module.exports = {
  dataModels,
  corsOptions,
};
