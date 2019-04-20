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

router.get(
  '/email',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/signin'
  })
);

router.post('/signup', async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(422).send({ error: 'You must provide an email and password' });
    return;
  }
  const existingUser = await EmailAuth.query().findOne({ email });
  if (existingUser) {
    res.status(422).send({ error: 'Email in use' });
    return;
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

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
