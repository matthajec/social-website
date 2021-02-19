/**
 * Flash the session and redirect
 * @param            req     request object
 * @param {string}   key     key to be flashed
 * @param            value   value to be flashed
 * @param {function} cb      function to be ran after the session has been flashed, called with possible error
 */
module.exports = (req, key, value, cb) => {
  // flash the value
  req.flash(key, value);

  // wait for the save to finish (or exit via error) then run the callback;
  req.session.save((err) => {
    cb(err);
  });
};