import { UserType, Done, OAuth } from "../@types";
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local");
const keys = require("../config/keys");
const User = require("../models/User");
const GAuth = require("../models/GAuth");
const FBAuth = require("../models/FBAuth");
const EmailAuth = require("../models/EmailAuth");

passport.serializeUser((user: UserType, done: Done): void => {
  done(null, user.id);
});

passport.deserializeUser(
  async (id: number, done: Done): Promise<void> => {
    const user = await User.findById(id);
    done(null, user);
  }
);

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (
      _accessToken: string | null,
      _refreshToken: string | null,
      profile: OAuth,
      done: Done
    ): Promise<void> => {
      const existingUser = await GAuth.query().findOne({
        googleid: profile.id,
      });
      if (existingUser) {
        done(null, { id: existingUser.uid });
      } else {
        const user = await User.insertUser({
          id: profile.id,
          type: "googleauth",
        });
        console.log(user);
        done(null, user);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.fbClientID,
      clientSecret: keys.fbClientSecret,
      callbackURL: "/auth/facebook/callback",
      proxy: true,
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: OAuth,
      done: Done
    ): Promise<void> => {
      try {
        const existingUser = await FBAuth.query().findOne({
          fbid: profile.id,
        });
        if (existingUser) {
          done(null, { id: existingUser.uid });
        } else {
          const user = await User.insertUser({
            id: profile.id,
            type: "facebookauth",
          });
          done(null, user);
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email: string, password: string, done: Done): Promise<void> => {
      const existingUser = await EmailAuth.query().findOne({ email });
      if (!existingUser) {
        return done(null, false, { error: "Email address does not exist" });
      }
      const match = await existingUser.comparePassword(password);
      if (!match) {
        return done(null, false, { error: "Incorrect password" });
      }
      return done(null, { id: existingUser.uid });
    }
  )
);
