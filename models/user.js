const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { dataModels } = require('../utils/constants');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { errMessages } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: (props) => `${props.value} ${errMessages.incorrectEmail}`,
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  versionKey: false,
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  const error = new UnauthorizedError(errMessages.incorrectLoginInfo);

  return this.findOne({ email }).select('+password')
    .orFail(error)
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw error;
        }

        return user;
      }));
};

module.exports = mongoose.model(dataModels.user, userSchema);
