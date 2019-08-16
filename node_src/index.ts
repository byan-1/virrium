const express = require('express');
const {Model} = require('objection');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const cookieSession = require('cookie-session');
const router = require('./routes');
const knex = require('./config/db');
const keys = require('./config/keys');
const errHandler = require('./middleware/errHandler');
require('./services/passport');

const app = express()
                .use(bodyParser.json())
                .use(cookieSession(
                    {maxAge: 30 * 24 * 60 * 60 * 1000, keys: [keys.cookieKey]}))
                .use(morgan('combined'))
                .use(passport.initialize())
                .use(passport.session())
                .use(router)
                .use(errHandler);

Model.knex(knex);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

// Fixes Typescript namespace error
export {};
