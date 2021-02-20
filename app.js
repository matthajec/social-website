// DEPENDENCIES
// ===============================================================================

require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const User = require('./models/user');

// SET UP
// ===============================================================================

// initialize an express app
const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

// set up mongodb as the location where the session is stored
const mongoStore = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});

// MIDDLEWARE
// ===============================================================================

// parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// expose the contents of folder "public" to the web
app.use(express.static(path.join(__dirname, 'public')));

// create and manage sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: mongoStore
  })
);

// generates a new CSRF token on each request and passes it to every render;
app.use(csrf());
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

// set up connect flash
app.use(flash());

// get the user from db
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  User
    .findById(req.session.user._id)
    .then(user => {
      if (!user) {
        // set user to undefined because their user object is malformed and they will keep getting errors otherwise
        req.session.user = undefined;
        throw new Error('failed to find user');
      }

      req.user = user;
      next();
    })
    .catch(err => {
      const error = new Error(err);
      error.code = 500;
      next(error);
    });
});

// ROUTES
// ===============================================================================
const authRoutes = require('./routes/auth');
const socialRoutes = require('./routes/social');

// routes associated with authorized (log in/out, register, etc)
app.use(authRoutes);

// routes associated with viewing social content (users, posts, etc)
app.use(socialRoutes);


// ERROR HANDLING MIDDLEWARE
// ===============================================================================

app.use((err, req, res, next) => {
  console.log(err);

  const code = err.code;

  if (code === 401) {
    return res.redirect('/login');
  }

  if (code === 403) {
    return res.render('error/403', {
      docTitle: 'Unauthorized',
      pageCategory: null
    });
  }

  if (code === 422) {
    return res.render('error/422', {
      docTitle: 'Something went wrong...',
      pageCategory: null
    });
  }

  res.render('error/500', {
    docTitle: 'Something went wrong...',
    pageCategory: null
  });
});





// START SERVER
// ===========================================================

// connect to mongoDb then start the server
mongoose
  .connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    app.listen((process.env.PORT || 3000), () => {
      console.log('Server listening on port ' + (process.env.PORT || 3000));
    });
  })
  .catch(err => {
    console.log(err);
  });
