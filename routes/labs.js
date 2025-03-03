const express = require("express");
const Lab = require("../models/Lab"); // 🔹 Importa o modelo de Lab

const router = express.Router();

// 📌 Criar um novo Lab
router.post("/", async (req, res) => {
  try {
    const lab = await Lab.create(req.body);
    res.status(201).json(lab);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar Lab", detalhes: error.message });
  }
});

// 📌 Listar todos os Labs
router.get("/", async (req, res) => {
  try {
    const labs = await Lab.findAll();
    res.json(labs);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar Labs", detalhes: error.message });
  }
});

module.exports = router;
