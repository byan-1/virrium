const express = require('express');
const authRoutes = require('./authRoutes');
const questionAPI = require('./api/questionAPI');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/api/question', questionAPI);

module.exports = router;
