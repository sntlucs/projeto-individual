const express = require("express");
const router = express.Router();
const controller = require("../controllers/personagemController");

router.post("/", controller.inserir);
router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.deletar);
router.get('/usuario/:id', controller.listarPorUsuario);

module.exports = router;
