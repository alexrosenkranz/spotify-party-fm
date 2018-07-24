const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// Import routes
const routes = require('./routes');

// Set up Express
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev')); // for logging

// We need to use sessions to keep track of our user's login status
app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true}));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
} // Add routes, both API and route to client/build
app.use(routes);

mongoose.Promise = Promise;

// Connect to the Mongo DB
mongoose.connect(process.env.NODE_ENV === 'production'
  ? process.env.MONGODB_URI
  : 'mongodb://localhost/spotify-fm');

// Start the API server
app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
