const express = require("express");
const router = express.Router();
const controller = require("../controllers/personagemController");

router.post("/", controller.inserir);
router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.deletar);
router.get('/usuario/:id', controller.listarPorUsuario);

router.get("/graficos/:id_usuario", async (req, res) => {
    const id_usuario = req.params.id_usuario;

    try {
        const resultado = await controller.listarDadosGraficos(id_usuario);
        res.json(resultado);
    } catch (erro) {
        console.error("Erro ao buscar dados para gráficos:", erro);
        res.status(500).json({ erro: "Erro ao buscar dados para gráficos" });
    }
});

module.exports = router;

