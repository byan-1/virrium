const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const EmailAuth = require('../models/EmailAuth');

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/signin'
  })
);

router.get('/facebook', passport.authenticate('facebook'));

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/dashboard',
    failureRedirect: '/signin'
  })
);

router.post('/email', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    //overwrite passport's default missing credentials error message
    if (info && info.message) {
      return res
        .status(401)
        .send({ error: 'You must provide an email and password' });
    }
    if (info) {
      return res.status(401).send(info);
    }
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      res.send(user);
    });
  })(req, res, next);
});

router.post('/signup', async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide an email and password' });
  }

  const existingUser = await EmailAuth.query().findOne({ email });
  if (existingUser) {
    return res.status(422).send({ error: 'Email in use' });
  }

  const hashedPassword = await EmailAuth.hashPassword(password);

  const user = await User.query()
    .insert({})
    .returning('*');

  await user.$relatedQuery('eauth').insert({ email, password: hashedPassword });

  req.login({ id: user.id }, err => {
    if (err) {
      return next(err);
    }
    return res.send({ id: user.id });
  });
});

router.get('/current_user', (req, res) => {
  res.send(req.user ? { id: req.user.id } : null);
});

router.post('/logout', (req, res) => {
  req.logout();
  res.end();
});

module.exports = router;
