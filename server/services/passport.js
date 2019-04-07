const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../config/keys');

const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.query().findById(id, done);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.query().findOne({
        validation_data: profile.id
      });
      if (existingUser) {
        done(null, existingUser);
      } else {
        const user = await User.query().insertGraphAndFetch({
          email: profile.emails[0].value,
          account_type: profile.provider,
          validation_data: profile.id
        });
        done(null, user);
      }
    }
  )
);
