const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Unauthorized = require('../errors/unauthorized');
const Conflict = require('../errors/conflict');
const BadRequest = require('../errors/bad-request');

module.exports = {
  login(req, res, next) {
    const { email, password } = req.body;

    return User.findUserByCredentials(email, password)
      .then((user) => {
        res.send({
          token: jwt.sign({ _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' }),

        });
      })
      .catch((error) => {
        next(new Unauthorized(`${error.message}`));
      });
  },
  // eslint-disable-next-line consistent-return
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
      // eslint-disable-next-line consistent-return
      .catch((error) => {
        if (error.name === 'ValidationError') {
          if (error.errors.email && error.errors.email.kind === 'unique') {
            next(new Conflict(error.errors.email.properties.message));
          } else {
            next(new BadRequest(error.message));
          }
        } else {
          next(error);
        }
      });
  },
};
