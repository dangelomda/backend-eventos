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

// 📌 Atualizar um Lab (definir limite de vagas)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { limite_vagas } = req.body;

    const lab = await Lab.findByPk(id);
    if (!lab) {
      return res.status(404).json({ error: "Lab não encontrado." });
    }

    // 🔹 Atualiza o limite de vagas
    lab.limite_vagas = limite_vagas;
    await lab.save();

    res.json({ message: "Lab atualizado com sucesso.", lab });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar Lab", detalhes: error.message });
  }
});

module.exports = router;
