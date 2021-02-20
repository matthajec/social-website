module.exports = (options) => {
  return (req, res, next) => {
    // if the user is not authenticated, give them a 401 error
    if (req.session.user) {
      // if the user does not have the right authorization give them a 403 error
      if (req.session.user.authLevel < options.level) {
        const error = new Error('unauthorized');
        error.code = 403;
        return next(error);
      }
    } else {
      const error = new Error('unauthenticated');
      error.code = 401;
      return next(error);
    }

    next();
  };
}