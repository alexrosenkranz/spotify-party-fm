const router = require('express').Router();
const passport = require('passport');
const usersController = require('../../controllers/usersController');

router
  .route('/spotify')
  .get(passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private']
  }), (req, res) => {
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  });

router
  .route('/spotify/callback')
  .get(passport.authenticate('spotify', {failureRedirect: '/login'}), (req, res) => {
    console.log(req.query);
    // Successful authentication, redirect home.
    res.json(req.user);
  });

module.exports = router;
