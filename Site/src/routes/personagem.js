var express = require("express");
var router = express.Router();

var personagemController = require("../controllers/personagemController");

router.post("/cadastrar", function (req, res) {
    personagemController.cadastrarPersonagem(req, res);
});

router.get("/listar", function (req, res) {
    personagemController.listarPersonagem(req, res);
});

module.exports = router;