const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
require('dotenv').config();

// Import routes
const routes = require('./routes');

// Set up Express
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev')); // for logging

// We need to use sessions to keep track of our user's login status
app.use(session({secret: "keyboard cat", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets
app.use(express.static('client/build'));
// Add routes, both API and route to client/build
app.use(routes);

// Passport session setup.   To support persistent login sessions, Passport
// needs to be able to   serialize users into and deserialize users out of the
// session. Typically,   this will be as simple as storing the user ID when
// serializing, and finding   the user by ID when deserializing. However, since
// this example does not   have a database of user records, the complete spotify
// profile is serialized   and deserialized.
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});


// Set up passport to authenticate
const User = require('./models/user');

passport.use(new SpotifyStrategy({
  clientID: process.env.SPOTIFYCLIENT,
  clientSecret: process.env.SPOTIFYSECRET,
  callbackURL: "http://localhost:3001/api/auth/spotify/callback"
},
  (accessToken, refreshToken, expires_in, profile, done) => {
    User.findOrCreate({ spotifyId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/spotify-fm');

// Start the API server
app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
