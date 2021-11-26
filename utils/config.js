require('dotenv').config();

module.exports = {
  PORT: (process.env.NODE_ENV !== 'production') ? 3000 : process.env.PORT,
  DB_URI: (process.env.NODE_ENV !== 'production') ? 'mongodb://localhost:27017/moviesdb' : process.env.DB_URI,
  JWT_SECRET: (process.env.NODE_ENV !== 'production') ? 'secret-key' : process.env.JWT_SECRET,
};
