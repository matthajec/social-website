const bcrypt = require('bcryptjs');

const { User } = require('../models');
const { validation } = require('../util');
const { password } = require('../util/validation/rules');

// destructure from validations
const { rules, checkMultiple } = validation;

// LOGIN
// ===============================================================================

exports.getLogin = (req, res) => {
  res.render('auth/login', {
    docTitle: 'Login',
    pageCategory: null,
    oldValues: req.flash('oldValues')[0],
    errorMsg: req.flash('errorMsg')[0]
  });
};

exports.postLogin = (req, res, next) => {
  let {
    email,
    pass
  } = req.body;

  // see if all rules are true
  const isValid = checkMultiple([
    rules.email(email),
    rules.password(pass)
  ]);

  // if all rules aren't met start a 422 error (because client-side you shouldn't be able to submit an invalid form)
  if (!isValid) {
    const error = new Error('invalid form');
    error.code = 422;
    return next(error);
  }

  email = email.toLowerCase();

  User
    .findOne({ email: email })
    .then((userDoc) => {
      // if no user is found with the email then tell the user
      if (!userDoc) {
        req.flash('errorMsg', 'There is no account with that email');
        req.flash('oldValues', req.body);
        return req.session.save(() => {
          res.redirect('/login');
        });
      }

      // figure out whether the inputted password is correct
      bcrypt
        .compare(pass, userDoc.pass)
        .then((doMatch) => {
          // if the password is correct store the user in the session and redirect to the home page
          if (doMatch) {
            req.session.user = userDoc;
            return req.session.save(() => {
              res.redirect('/');
            });
          }

          // if the password is incorrect then tell the user
          req.flash('errorMsg', 'Incorrect password');
          req.flash('oldValues', req.body);
          return req.session.save(() => {
            res.redirect('/login');
          });
        })
        .catch((err) => {
          const error = new Error(err);
          err.code = 500;
          next(err);
        });
    });
};

// SIGNUP
// ===============================================================================

exports.getSignup = (req, res) => {
  res.render('auth/signup', {
    docTitle: 'Signup',
    pageCategory: null,
    oldValues: req.flash('oldValues')[0],
    errorMsg: req.flash('errorMsg')[0]
  });
};

exports.postSignup = (req, res, next) => {
  // destructure rules and checkMultipe out of validation
  let {
    email,
    uname,
    fname,
    lname,
    pass
  } = req.body;

  // see if all rules are true
  const isValid = checkMultiple([
    rules.email(email),
    rules.username(uname),
    rules.legalName(fname),
    rules.legalName(lname),
    rules.password(pass)
  ]);

  // if all rules aren't met start a 422 error (because client-side you shouldn't be able to submit an invalid form)
  if (!isValid) {
    const error = new Error('invalid form');
    error.code = 422;
    return next(error);
  }

  email = email.toLowerCase();
  uname = uname.toLowerCase();

  User
    .findOne({ $or: [{ email: email }, { uname: uname }] })
    .then((userDoc) => {
      if (userDoc) {
        // figure out what already existed (a user with the email or a user with the username)
        const failureOn = userDoc.email === email ? 'email' : 'username';
        req.flash('errorMsg', 'An account already exists with that ' + failureOn + '.');
        req.flash('oldValues', req.body);
        return req.session.save(() => {
          res.redirect('/signup');
        });
      }

      return bcrypt
        .hash(pass, 12)
        .then((hashedPass) => {
          const user = new User({
            email: email,
            uname: uname,
            fname: fname,
            lname: lname,
            pass: hashedPass,
            authLevel: 5
          });
          return user.save();
        })
        .then(user => {
          res.send('created an account');
        });
    })
    .catch((err) => {
      console.log(err);
      next(500);
    });
};

// LOGOUT
// ===============================================================================

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      const error = new Error(err);
      error.code = 500;
      next(error);
    } else {
      res.redirect('/login');
    }
  });
};