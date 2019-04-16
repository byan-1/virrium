const express = require('express');
const passport = require('passport');
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

router.get('/signup', async (req, res) => {
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

  const user = await EmailAuth.query()
    .insert({ email, password })
    .returning('*');
  req.login({ id: user.uid });
  res.redirect('/dashboard');
});

router.get('/current_user', (req, res) => {
  res.send(req.user ? { id: req.user.id } : null);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
