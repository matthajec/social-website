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

// set up connect flash
app.use(flash());

// generates a new CSRF token on each request and passes it to every render;
app.use(csrf());
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.post((req, res, next) => {
  console.log('POST detected');
  next();
});

// ROUTES
// ===============================================================================
const authRoutes = require('./routes/auth');

// routes associated with authorized (log in/out, register, etc)
app.use(authRoutes);


// ERROR HANDLING MIDDLEWARE
// ===============================================================================

app.use((err, req, res, next) => {
  console.log(err);
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
