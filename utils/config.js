require('dotenv').config();

const {
  PORT = 3000,
  DB_URI = 'mongodb://localhost:27017/moviesdb',
  JWT_SECRET = 'secret-key',
} = process.env;

module.exports = {
  PORT,
  DB_URI,
  JWT_SECRET,
};
