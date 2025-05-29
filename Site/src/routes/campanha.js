var express = require("express");
var router = express.Router();

var database = require("../database/config");

router.get("/", function (req, res) {
    var instrucao = "SELECT * FROM Campanha";
    database.executar(instrucao)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.error("Erro ao listar campanhas:", erro);
            res.status(500).json({ erro: "Erro ao listar campanhas" });
        });
});

module.exports = router;
