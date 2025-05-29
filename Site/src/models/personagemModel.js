var database = require("../database/config");

async function listar(id_usuario) {
    const instrucao = `
        SELECT p.*, c.nome AS nomeCampanha
        FROM Personagem p
        JOIN Campanha_Personagem cp ON cp.id_personagem = p.id_personagem
        JOIN Campanha c ON c.id_campanha = cp.id_campanha
        WHERE p.id_usuario = ${id_usuario};
    `;

    return await database.executar(instrucao);
}

function listarPorUsuario(id_usuario) {
    console.log("Listando personagens do usuário:", id_usuario);

    var instrucaoSql = `
        SELECT p.*, c.nome AS nomeCampanha
        FROM Personagem p
        JOIN Campanha_Personagem cp ON p.id_personagem = cp.id_personagem
        JOIN Campanha c ON cp.id_campanha = c.id_campanha
        WHERE p.id_usuario = ${id_usuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorId(id_personagem) {
    var instrucao = `
        SELECT p.*, cp.id_campanha
        FROM Personagem p
        LEFT JOIN Campanha_Personagem cp ON p.id_personagem = cp.id_personagem
        WHERE p.id_personagem = ${id_personagem};
    `;
    return database.executar(instrucao);
}

function inserir(nome, origem, classe, nivel, id_usuario, id_campanha) {
    var instrucaoPersonagem = `
        INSERT INTO Personagem (nome, origem, classe, nivel, id_usuario)
        VALUES ('${nome}', '${origem}', '${classe}', ${nivel}, ${id_usuario});
    `;

    return database.executar(instrucaoPersonagem);
}

function associarCampanha(id_personagem, id_campanha) {
    var instrucaoRelacionamento = `
        INSERT INTO Campanha_Personagem (id_campanha, id_personagem)
        VALUES (${id_campanha}, ${id_personagem});
    `;
    return database.executar(instrucaoRelacionamento);
}

async function atualizar(id_personagem, nome, origem, classe, nivel, id_usuario, id_campanha) {
    try {
        await database.executar(`
            UPDATE Personagem
            SET nome = '${nome}', origem = '${origem}', classe = '${classe}', nivel = ${nivel}, id_usuario = ${id_usuario}
            WHERE id_personagem = ${id_personagem};
        `);

        await database.executar(`
            DELETE FROM Campanha_Personagem
            WHERE id_personagem = ${id_personagem};
        `);

        await database.executar(`
            INSERT INTO Campanha_Personagem (id_campanha, id_personagem)
            VALUES (${id_campanha}, ${id_personagem});
        `);
    } catch (erro) {
        console.error("Erro ao atualizar personagem:", erro);
        throw erro;
    }
}

function deletar(id_personagem) {
    var instrucaoRelacionamento = `
        DELETE FROM Campanha_Personagem WHERE id_personagem = ${id_personagem};
    `;
    var instrucao = `
        DELETE FROM Personagem WHERE id_personagem = ${id_personagem};
    `;
    return database.executar(instrucaoRelacionamento + instrucao);
}

module.exports = {
    listar,
    buscarPorId,
    inserir,
    associarCampanha,
    atualizar,
    deletar,
    listarPorUsuario
};
