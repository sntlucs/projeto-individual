const personagemModel = require("../models/personagemModel");

function listar(req, res) {
    personagemModel.listar((erro, resultados) => {
        if (erro) return res.status(500).json(erro);
        res.json(resultados);
    });
}

function buscarPorId(req, res) {
    const id = req.params.id;
    personagemModel.buscarPorId(id, (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        if (!resultado) return res.status(404).json({ mensagem: "Personagem não encontrado" });
        res.json(resultado);
    });
}

function inserir(req, res) {
    const { nome, origem, classe, nivel, id_usuario, id_campanha } = req.body;
    personagemModel.inserir({ nome, origem, classe, nivel, id_usuario, id_campanha }, (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.status(201).json({ mensagem: "Personagem criado com sucesso!" });
    });
}

function atualizar(req, res) {
    const id = req.params.id;
    const { nome, origem, classe, nivel, id_usuario, id_campanha } = req.body;
    personagemModel.atualizar(id, { nome, origem, classe, nivel, id_usuario, id_campanha }, (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json({ mensagem: "Personagem atualizado com sucesso!" });
    });
}

function deletar(req, res) {
    const id = req.params.id;
    personagemModel.deletar(id, (erro, resultado) => {
        if (erro) return res.status(500).json(erro);
        res.json({ mensagem: "Personagem deletado com sucesso!" });
    });
}

module.exports = {
    listar,
    buscarPorId,
    inserir,
    atualizar,
    deletar
};
