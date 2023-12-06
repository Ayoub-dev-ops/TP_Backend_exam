var express = require('express');
var router = express.Router();
var authControler = require('../controlers/auth')

//Écriture de tous les post/get et delete pour l'authentification
router.post('/register', authControler.register);
router.get('/login', authControler.login);
router.get('/refreshToken', authControler.refreshToken);

module.exports = router;