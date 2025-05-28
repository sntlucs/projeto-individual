const express = require("express");
const router = express.Router();
const controller = require("../controllers/personagem");

router.post("/", controller.criarPersonagem);
router.get("/", controller.listarPersonagens);
router.get("/:id", controller.buscarPersonagemPorId);
router.put("/:id", controller.atualizarPersonagem);
router.delete("/:id", controller.deletarPersonagem);

module.exports = router;