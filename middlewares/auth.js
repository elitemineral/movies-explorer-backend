const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, _res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;

  let payload;

  try {
    payload = jwt.verify(req.cookies.jwt, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    throw new UnauthorizedError('С токеном что-то не так');
  }

  req.user = payload;

  next();
};
