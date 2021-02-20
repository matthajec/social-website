exports.flash = require('./flash');
exports.validation = {
  rules: require('./validation/rules'),
  checkMultiple: require('./validation/check-multiple')
};
exports.auth = {
  checkAuth: require('./auth/check-auth')
};