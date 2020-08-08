const { isURL } = require('validator');
const { INCORRECT_FIELD_FORMAT } = require('../configuration/constants');

module.exports = (value, helpers) => {
  if (!isURL(value)) {
    // eslint-disable-next-line no-useless-escape
    return helpers.message(`${INCORRECT_FIELD_FORMAT} + ${helpers.state.path}`);
  }
  return value;
};
