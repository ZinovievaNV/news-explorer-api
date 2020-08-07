const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const { errorMessage } = require('../errors/error-message');

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .prefs({
        messages: errorMessage('name'),
      }),
    email: Joi.string()
      .required()
      .email()
      .prefs({
        messages: errorMessage('email'),
      }),
    password: Joi.string()
      .required()
      .pattern(/^([a-zA-Z0-9@*#-_%|]{8,15})$/)
      .prefs({
        messages: errorMessage('password'),
      }),
  }),
});

const loginUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .prefs({
        messages: errorMessage('email'),
      }),
    password: Joi.string()
      .required()
      .min(8)
      .prefs({
        messages: errorMessage('password'),
      }),
  }),
});

const userIdValidation = celebrate({
  params: Joi.object({
    userId: Joi.objectId().message('Поле userId должно быть не больше 24 символов'),
  }),
});

module.exports = {
  createUserValidation,
  userIdValidation,
  loginUserValidation,
};
