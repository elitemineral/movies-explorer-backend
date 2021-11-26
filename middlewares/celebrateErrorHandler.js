const { isCelebrateError } = require('celebrate');
const BadRequestError = require('../errors/BadRequestError');

module.exports = (err, _req, _res, next) => {
  const throwError = (error) => {
    if (error) {
      const { details: [errorDetails] } = error;
      throw new BadRequestError(errorDetails.message);
    }
  };

  if (isCelebrateError(err)) {
    const errorParams = err.details.get('params');
    throwError(errorParams);

    const errorBody = err.details.get('body');
    throwError(errorBody);
  }

  return next(err);
};
