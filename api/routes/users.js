var express = require('express');
var router = express.Router();
var userControler = require('../controlers/users')
var authWithToken = require('../middlewares/authWithToken')

router.get('/me', authWithToken, userControler.getMe);
router.post('/', userControler.create);

module.exports = router;