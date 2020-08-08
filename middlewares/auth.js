const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized');
const { AUTHORIZATION_REQUIRED } = require('../configuration/constants');
const { SECRET } = require('../configuration/conf');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized(AUTHORIZATION_REQUIRED);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET);
  } catch (err) {
    throw new Unauthorized(AUTHORIZATION_REQUIRED);
  }

  req.user = payload;

  next();
};
