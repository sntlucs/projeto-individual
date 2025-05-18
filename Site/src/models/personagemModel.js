var database = require("../database/config");

function cadastrarPersonagem(nome, origem, classe, nivel) {
    console.log("ACESSEI O PERSONAGEM MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarFuncionario():", nome, sobrenome, email, senha);

    var instrucaoSql = `
        INSERT INTO personagem (nome, origem, classe, nivel) VALUES ('${nome}', '${origem}', '${classe}', '${nivel}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPersonagem() {
    console.log("ACESSEI O PERSONAGEM MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarFuncionarios()");

    var instrucaoSql = `
        SELECT id, nome, origem, classe, nivel FROM funcionario;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarPersonagem,
    listarPersonagem
};