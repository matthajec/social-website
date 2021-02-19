const rules = require('./rules');

module.exports = (array) => {
  let valid = true;
  array.forEach(rule => {
    if (rule === false)
      valid = false;
  });
  return valid;
};