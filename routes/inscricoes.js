const express = require("express");
const router = express.Router();
const Inscricao = require("../models/Inscricao");

// Criar uma nova inscrição
router.post("/", async (req, res) => {
    try {
        const { participante_id, lab_id, periodo } = req.body;
        const inscricao = await Inscricao.create({ participante_id, lab_id, periodo });
        res.json(inscricao);
    } catch (error) {
        console.error("Erro ao criar inscrição:", error);
        res.status(500).json({ error: "Erro ao criar inscrição" });
    }
});

// Listar todas as inscrições
router.get("/", async (req, res) => {
    try {
        const inscricoes = await Inscricao.findAll();
        res.json(inscricoes);
    } catch (error) {
        console.error("Erro ao listar inscrições:", error);
        res.status(500).json({ error: "Erro ao listar inscrições" });
    }
});

module.exports = router;
