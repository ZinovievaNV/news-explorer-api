const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');
const { INVALID_MAIL_FORMAT, INCORRECT_EMAIL_OR_PASS, EMAIL_CONFLIG} = require('../configuration/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
    validator(v) {
      return validator.isEmail(v);
    },
    message: INVALID_MAIL_FORMAT,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(INCORRECT_EMAIL_OR_PASS));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(INCORRECT_EMAIL_OR_PASS));
          }

          return user;
        });
    });
};

userSchema.plugin(uniqueValidator, { message: EMAIL_CONFLIG });

module.exports = mongoose.model('user', userSchema);
