const validator = require('validator');

const rules = {};

rules.email = (value) => {
  return validator.isEmail(value);
};

rules.username = (value) => {
  return validator.isAlphanumeric(value) || validator.isLength(value, { min: 3, max: 30 });
};

rules.legalName = (value) => {
  return validator.isAlpha(value) || validator.isLength(value, { min: 1, max: 30 });
};

rules.password = (value) => {
  return validator.isLength(value, { min: 8 });
};

module.exports = rules;