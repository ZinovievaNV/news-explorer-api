const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');// 404 код

module.exports = {
  getUserMe(req, res, next) {
    User.findById(req.user._id)

      .then((user) => {
        if (!user) {
          throw new NotFoundError('Нет пользователя с таким id');
        }
        res.send({name: user.name, email: user.email});
      })
      .catch(next);
  },

};
