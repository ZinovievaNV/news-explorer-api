const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Unauthorized = require('../errors/unauthorized');
const Conflict = require('../errors/conflict');
const BadRequest = require('../errors/bad-request');
const {SECRET} = require('../configuration/conf');

module.exports = {
  login(req, res, next) {
    const { email, password } = req.body;

    return User.findUserByCredentials(email, password)
      .then((user) => {
        res.send({
          token: jwt.sign({ _id: user._id },
            SECRET),

        });
      })
      .catch((error) => {
        next(new Unauthorized(`${error.message}`));
      });
  },

  createUser(req, res, next) {
    const {
      name, email,
    } = req.body;

    bcrypt.hash(req.body.password, 10)
      .then((hash) => User.create({
        name, email, password: hash,
      }))
      .then(() => res.status(201).send({
        data: name, email, message: 'Вы создались!',
      }))
      .catch((error) => {
        if (error.name === 'ValidationError') {
          if (error.errors.email && error.errors.email.kind === 'unique') {
            next(new Conflict(error.errors.email.properties.message));
          } else {
            next(new BadRequest(error));
          }
        } else {
          next(error);
        }
      });
  },
};
