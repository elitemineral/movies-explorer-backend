const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_SECRET } = require('../utils/config');

module.exports = (req, _res, next) => {
  let payload;

  try {
    payload = jwt.verify(req.cookies.jwt, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError('С токеном что-то не так');
  }

  req.user = payload;
  next();
};
