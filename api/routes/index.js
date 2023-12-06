var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var dpeRouter = require('./DPE');
var authRouter = require('./auth');

router.use('/auth', authRouter);
router.use('/DPE', dpeRouter);
router.use('/users', usersRouter);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;