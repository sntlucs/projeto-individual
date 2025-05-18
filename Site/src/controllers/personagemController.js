var personagemModel = require('../models/personagemModel');

function cadastrarFuncionario(req, res) {
    var nome = req.body.nomeServer;
    var origem = req.body.origemServer;
    var classe = req.body.classeServer;
    var nivel = req.body.nivelServer;

    // Validações individuais
    if (nome == undefined) {
        res.status(400).send("O nome está undefined!");
    } else if (origem == undefined) {
        res.status(400).send("A origem está undefined!");
    } else if (classe == undefined) {
        res.status(400).send("A classe está undefined!");
    } else if (nivel == undefined) {
        res.status(400).send("O nivel está undefined!");
    } else {
        funcionarioModel.cadastrarFuncionario(nome, origem, classe, nivel)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao cadastrar o funcionário! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function listarPersonagem(req, res) {
    personagemModel.listarPersonagem()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum personagem encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao listar os personagens! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    cadastrarPersonagem,
    listarPersonagem
};