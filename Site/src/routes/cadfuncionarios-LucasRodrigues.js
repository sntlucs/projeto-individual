var express = require('express');
var router = express.Router();
var personagemController = require('../controllers/personagemController');

router.post('/cadastrar', personagemController.cadastrar);

module.exports = router;