const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const urlValidation = require('./url-validate');
const { errorMessage } = require('../configuration/constants');

const articleValidation = celebrate({
  body: Joi.object().keys({
    link: Joi.string()
      .required()
      .custom(urlValidation, 'url validation')
      .prefs({
        messages: errorMessage('link'),
      }),
    image: Joi.string()
      .required()
      .custom(urlValidation, 'url validation')
      .prefs({
        messages: errorMessage('image'),
      }),
    source: Joi.string()
      .required()
      .prefs({
        messages: errorMessage('source'),
      }),
    date: Joi.string()
      .required()
      .prefs({
        messages: errorMessage('date'),
      }),
    text: Joi.string()
      .required()
      .prefs({
        messages: errorMessage('text'),
      }),
    title: Joi.string()
      .required()
      .prefs({
        messages: errorMessage('title'),
      }),
    keyword: Joi.string()
      .required()
      .prefs({
        messages: errorMessage('keyword'),
      }),
  }),
});

const articleIdValidationId = celebrate({
  params: Joi.object({
    articleId: Joi.objectId().message('Поле articleId должно быть не меньше 24 символов'),
  }),
});

module.exports = { articleValidation, articleIdValidationId };
