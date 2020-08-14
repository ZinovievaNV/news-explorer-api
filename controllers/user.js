const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');// 404 код
const { USER_NOT_FOUND } = require('../configuration/constants');

module.exports = {
  // Возвращает информацию о пользователе (email и имя)
  getUserMe(req, res, next) {
    User.findById(req.user._id)

      .then((user) => {
        if (!user) {
          throw new NotFoundError(USER_NOT_FOUND);
        }
        res.send({ name: user.name, email: user.email });
      })
      .catch(next);
  },

};
