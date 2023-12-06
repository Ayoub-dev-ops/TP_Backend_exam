var express = require('express');
var router = express.Router();
var dpeControler = require('../controlers/DPE')

router.get('/', dpeControler.search);

module.exports = router;