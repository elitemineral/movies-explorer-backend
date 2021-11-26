const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../utils/config');
const User = require('../models/user');

const ConflictError = require('../errors/ConflictError');
const { resMessages, errMessages } = require('../utils/constants');

const duplicateEmailError = new ConflictError(errMessages.duplicateEmail);

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: 3600 * 24 * 7 },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      }).send({ message: resMessages.successfulAuth });
    })
    .catch(next);
};

module.exports.logout = (_req, res) => {
  res.clearCookie('jwt', {
    secure: true,
    sameSite: 'none',
  }).send({ message: resMessages.successfulLogout });
};

module.exports.me = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(duplicateEmailError);
        return;
      }

      next(err);
    });
};

module.exports.setUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(duplicateEmailError);
        return;
      }

      next(err);
    });
};
