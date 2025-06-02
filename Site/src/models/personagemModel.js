var database = require("../database/config");

async function listar(id_usuario) {
    const instrucao = `
        SELECT p.*, c.nome AS nomeCampanha
        FROM Personagem p
        JOIN Campanha_Personagem cp ON cp.fk_personagem = p.id
        JOIN Campanha c ON c.id = cp.fk_campanha
        WHERE p.fk_usuario = ${id_usuario};
    `;

    return await database.executar(instrucao);
}

function listarPorUsuario(id_usuario) {
    console.log("Listando personagens do usuário:", id_usuario);

    var instrucaoSql = `
        SELECT p.*, c.nome AS nomeCampanha
        FROM Personagem p
        JOIN Campanha_Personagem cp ON p.id = cp.fk_personagem
        JOIN Campanha c ON cp.fk_campanha = c.id
        WHERE p.fk_usuario = ${id_usuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorId(id_personagem) {
    var instrucao = `
        SELECT p.*, cp.fk_campanha
        FROM Personagem p
        LEFT JOIN Campanha_Personagem cp ON p.id = cp.fk_personagem
        WHERE p.id = ${id_personagem};
    `;
    return database.executar(instrucao);
}

function inserir(nome, origem, classe, nivel, id_usuario) {
    var instrucaoPersonagem = `
        INSERT INTO Personagem (nome, origem, classe, nivel, fk_usuario)
        VALUES ('${nome}', '${origem}', '${classe}', ${nivel}, ${id_usuario});
    `;

    return database.executar(instrucaoPersonagem);
}

function associarCampanha(id_personagem, id_campanha) {
    var instrucaoRelacionamento = `
        INSERT INTO Campanha_Personagem (fk_campanha, fk_personagem)
        VALUES (${id_campanha}, ${id_personagem});
    `;
    return database.executar(instrucaoRelacionamento);
}

async function atualizar(id_personagem, nome, origem, classe, nivel, id_usuario, id_campanha) {
    try {
        await database.executar(`
            UPDATE Personagem
            SET nome = '${nome}', origem = '${origem}', classe = '${classe}', nivel = ${nivel}, fk_usuario = ${id_usuario}
            WHERE id = ${id_personagem};
        `);

        await database.executar(`
            DELETE FROM Campanha_Personagem
            WHERE fk_personagem = ${id_personagem};
        `);

        await database.executar(`
            INSERT INTO Campanha_Personagem (fk_campanha, fk_personagem)
            VALUES (${id_campanha}, ${id_personagem});
        `);
    } catch (erro) {
        console.error("Erro ao atualizar personagem:", erro);
        throw erro;
    }
}

async function deletar(id_personagem) {
    try {
        await database.executar(`
        DELETE FROM Campanha_Personagem WHERE fk_personagem = ${id_personagem};
    `);

        await database.executar(`DELETE FROM Personagem WHERE id = ${id_personagem};`)
    } catch (erro) {
        console.error("Erro ao atualizar personagem:", erro);
        throw erro;
    }
}

async function listarDadosGraficos(id_usuario) {
    const instrucao = `
        SELECT 
            p.nivel,
            p.classe,
            s.nome AS sistema
        FROM Personagem p
        JOIN Campanha_Personagem cp ON cp.fk_personagem = p.id
        JOIN Campanha c ON c.id = cp.fk_campanha
        JOIN Sistema s ON s.id = c.fk_sistema
        WHERE p.fk_usuario = ${id_usuario};
    `;
    return await database.executar(instrucao);
}

module.exports = {
    listar,
    buscarPorId,
    inserir,
    associarCampanha,
    atualizar,
    deletar,
    listarPorUsuario,
    listarDadosGraficos
};
