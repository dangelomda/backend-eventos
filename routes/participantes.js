const express = require("express");
const Participante = require("../models/Participante");

const router = express.Router();

// 🔹 Rota para criar um participante
router.post("/", async (req, res) => {
  try {
    const { nome, email, telefone } = req.body;
    const participante = await Participante.create({ nome, email, telefone });
    res.status(201).json(participante);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar participante", detalhes: error.message });
  }
});

// 🔹 Rota para listar todos os participantes
router.get("/", async (req, res) => {
  try {
    const participantes = await Participante.findAll();
    res.json(participantes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar participantes", detalhes: error.message });
  }
});

module.exports = router;
