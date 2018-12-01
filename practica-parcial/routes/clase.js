var express = require('express');
var router = express.Router();
var clase = require('../controllers/clase');

router.get('/', clase.findAll);

router.post('/', clase.create);

router.put('/:claseId', clase.update);

router.delete('/:claseId', clase.delete);

module.exports = router;

