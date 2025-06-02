const personagemModel = require("../models/personagemModel");

async function listar(req, res) {
    const id_usuario = req.query.usuario;

    try {
        const resultado = await personagemModel.listar(id_usuario);
        res.json(resultado);
    } catch (erro) {
        console.error("Erro ao listar personagens:", erro);
        res.status(500).send("Erro ao buscar personagens");
    }
}

async function listarPorUsuario(req, res) {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ erro: 'ID do usuário não fornecido' });
    }

    try {
        const resultado = await personagemModel.listarPorUsuario(id);
        res.json(resultado);
    } catch (erro) {
        console.error('Erro ao listar personagens por usuário:', erro);
        res.status(500).json({ erro: 'Erro ao listar personagens por usuário' });
    }
}

function buscarPorId(req, res) {
    const id = req.params.id;

    personagemModel.buscarPorId(id)
        .then(resultado => {
            if (resultado.length === 0) {
                res.status(404).json({ mensagem: "Personagem não encontrado" });
            } else {
                res.json(resultado[0]);
            }
        })
        .catch(erro => {
            console.error("Erro ao buscar personagem:", erro);
            res.status(500).json(erro.sqlMessage || erro.message);
        });
}

function inserir(req, res) {
    const { nome, origem, classe, nivel, id_usuario, id_campanha } = req.body;

    personagemModel.inserir(nome, origem, classe, nivel, id_usuario, id_campanha)
        .then(resultado => {
            const id_personagem = resultado.insertId;
            return personagemModel.associarCampanha(id_personagem, id_campanha);
        })
        .then(() => {
            res.status(201).json({ mensagem: "Personagem criado com sucesso!" });
        })
        .catch(erro => {
            console.error("Erro ao inserir personagem:", erro);
            res.status(500).json(erro.sqlMessage || erro.message);
        });
}

function atualizar(req, res) {
    const id = req.params.id;
    const { nome, origem, classe, nivel, id_usuario, id_campanha } = req.body;

    personagemModel.atualizar(id, nome, origem, classe, nivel, id_usuario, id_campanha)
        .then(() => {
            res.json({ mensagem: "Personagem atualizado com sucesso!" });
        })
        .catch(erro => {
            console.error("Erro ao atualizar personagem:", erro);
            res.status(500).json(erro.sqlMessage || erro.message);
        });
}

function deletar(req, res) {
    const id = req.params.id;

    personagemModel.deletar(id)
        .then(() => {
            res.json({ mensagem: "Personagem deletado com sucesso!" });
        })
        .catch(erro => {
            console.error("Erro ao deletar personagem:", erro);
            res.status(500).json(erro.sqlMessage || erro.message);
        });
}

async function listarDadosGraficos(id_usuario) {
    const todos = await personagemModel.listarDadosGraficos(id_usuario);
    return todos;
}

module.exports = {
    listar,
    buscarPorId,
    inserir,
    atualizar,
    deletar,
    listarPorUsuario,
    listarDadosGraficos
};
