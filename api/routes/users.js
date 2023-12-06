var express = require('express');
var router = express.Router();
var userControler = require('../controlers/users')
var authWithToken = require('../middlewares/authWithToken')

//Écriture de tous les post/get et delete pour les users
router.get('/', userControler.getAll);
router.get('/:id', userControler.getOne);
router.put('/:id', authWithToken, userControler.update);
router.delete('/:id', authWithToken, userControler.delete);
router.post('/login', userControler.login);
router.get('/me', authWithToken, userControler.getMe);
router.post('/', userControler.create);

module.exports = router;