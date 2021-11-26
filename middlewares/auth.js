const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_SECRET } = require('../utils/config');
const { errMessages } = require('../utils/constants');

module.exports = (req, _res, next) => {
  let payload;

  try {
    payload = jwt.verify(req.cookies.jwt, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError(errMessages.failedAuth);
  }

  req.user = payload;
  next();
};
