const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const googleClientID = require('../config/keys').googleClientID;
const googleClientSecret = require('../config/keys').googleClientSecret;
const usersService = require('./users.service');

const passportService = passport.use(new GoogleStrategy({
  clientID: googleClientID,
  clientSecret: googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (token, refreshToken, profile, done) => {
    usersService
      .find({googleId: profile.id})
      .then((user) => {
        if (!user) {
          usersService.create({ googleId: profile.id });
        }
      });

}));

module.exports = passportService;