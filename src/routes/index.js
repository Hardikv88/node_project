const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const postRoutes = require('./postRoutes');
const quoteRoutes = require('./quoteRoutes');

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/posts', postRoutes);
router.use('/quotes', quoteRoutes);

module.exports = router;