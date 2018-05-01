const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const googleClientID = require('../config/keys').googleClientID;
const googleClientSecret = require('../config/keys').googleClientSecret;
const usersService = require('./users.service');

module.exports = (app) => {
  app.use(passport.initialize());

  // serialize user instance
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  //deserialize user instance
  passport.deserializeUser((id, done) => {
    usersService
      .find({id})
      .then((user) => {
        done(null, user);
      })
  });

  passport.use(new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (token, refreshToken, profile, done) => {
    // check provided data from google oauth
    usersService
      .find({ googleId: profile.id })
      .then((user) => {
        if (!user) {
          // if user login first time create new database entry
          // and return serialized user instance
          usersService
            .create({ googleId: profile.id })
            .then(newUser => done(null, newUser));
        } else {
          // else return serialized user instance
          done(null, user);
        }
      });

  }));
};