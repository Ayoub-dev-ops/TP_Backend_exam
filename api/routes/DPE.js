var express = require('express');
var router = express.Router();
var dpeControler = require('../controlers/DPE')

//Écriture de tous les post/get et delete pour le DPE
router.get('/:id', dpeControler.getOne);
router.put('/:id', dpeControler.update);
router.delete('/:id', dpeControler.delete);
router.post('/', dpeControler.create);
router.get('/', dpeControler.search);

module.exports = router;