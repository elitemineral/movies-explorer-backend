const dataModels = {
  user: 'user',
  movie: 'movie',
};

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://178.154.220.21',
    'http://it-limon.nomoredomains.rocks',
    'https://it-limon.nomoredomains.rocks',
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
