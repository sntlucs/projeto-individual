const db = require("../database/config");

function listar(callback) {
    const sql = `
        SELECT p.*, c.nome AS nomeCampanha
        FROM Personagem p
        LEFT JOIN Campanha_Personagem cp ON p.id_personagem = cp.id_personagem
        LEFT JOIN Campanha c ON cp.id_campanha = c.id_campanha
    `;
    db.query(sql, callback);
}

function buscarPorId(id, callback) {
    const sql = `
        SELECT p.*, cp.id_campanha
        FROM Personagem p
        LEFT JOIN Campanha_Personagem cp ON p.id_personagem = cp.id_personagem
        WHERE p.id_personagem = ?
    `;
    db.query(sql, [id], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
    });
}

function inserir(personagem, callback) {
    const { nome, origem, classe, nivel, id_usuario, id_campanha } = personagem;
    const sqlPersonagem = `
        INSERT INTO Personagem (nome, origem, classe, nivel, id_usuario)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sqlPersonagem, [nome, origem, classe, nivel, id_usuario], (err, result) => {
        if (err) return callback(err);
        const id_personagem = result.insertId;
        const sqlRelacionamento = `
            INSERT INTO Campanha_Personagem (id_campanha, id_personagem)
            VALUES (?, ?)
        `;
        db.query(sqlRelacionamento, [id_campanha, id_personagem], callback);
    });
}

function atualizar(id, personagem, callback) {
    const { nome, origem, classe, nivel, id_usuario, id_campanha } = personagem;
    const sql = `
        UPDATE Personagem
        SET nome = ?, origem = ?, classe = ?, nivel = ?, id_usuario = ?
        WHERE id_personagem = ?
    `;
    db.query(sql, [nome, origem, classe, nivel, id_usuario, id], (err) => {
        if (err) return callback(err);

        const sqlRelacionamento = `
            REPLACE INTO Campanha_Personagem (id_campanha, id_personagem)
            VALUES (?, ?)
        `;
        db.query(sqlRelacionamento, [id_campanha, id], callback);
    });
}

function deletar(id, callback) {
    const sqlRelacionamento = `DELETE FROM Campanha_Personagem WHERE id_personagem = ?`;
    db.query(sqlRelacionamento, [id], (err) => {
        if (err) return callback(err);
        const sql = `DELETE FROM Personagem WHERE id_personagem = ?`;
        db.query(sql, [id], callback);
    });
}

module.exports = {
    listar,
    buscarPorId,
    inserir,
    atualizar,
    deletar
};
