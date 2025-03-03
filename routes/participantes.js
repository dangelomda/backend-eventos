const express = require("express");
const router = express.Router();
const Participante = require("../models/Participante");

// 🔹 Rota para listar todos os participantes
router.get("/", async (req, res) => {
  try {
    const participantes = await Participante.findAll();
    res.json(participantes);
  } catch (error) {
    console.error("Erro ao listar participantes:", error);
    res.status(500).json({ error: "Erro ao listar participantes" });
  }
});

// 🔹 Rota para buscar um participante por ID
router.get("/:id", async (req, res) => {
  try {
    const participante = await Participante.findByPk(req.params.id);
    if (!participante) {
      return res.status(404).json({ error: "Participante não encontrado" });
    }
    res.json(participante);
  } catch (error) {
    console.error("Erro ao buscar participante:", error);
    res.status(500).json({ error: "Erro ao buscar participante" });
  }
});

// 🔹 Rota para criar um novo participante (JÁ EXISTIA!)
router.post("/", async (req, res) => {
  try {
    const { nome, email, telefone } = req.body;
    const novoParticipante = await Participante.create({ nome, email, telefone });
    res.status(201).json(novoParticipante);
  } catch (error) {
    console.error("Erro ao criar participante:", error);
    res.status(500).json({ error: "Erro ao criar participante" });
  }
});

// 🔹 Rota para atualizar um participante por ID
router.put("/:id", async (req, res) => {
  try {
    const participante = await Participante.findByPk(req.params.id);
    if (!participante) {
      return res.status(404).json({ error: "Participante não encontrado" });
    }

    const { nome, email, telefone } = req.body;
    await participante.update({ nome, email, telefone });

    res.json(participante);
  } catch (error) {
    console.error("Erro ao atualizar participante:", error);
    res.status(500).json({ error: "Erro ao atualizar participante" });
  }
});

// 🔹 Rota para excluir um participante por ID
router.delete("/:id", async (req, res) => {
  try {
    const participante = await Participante.findByPk(req.params.id);
    if (!participante) {
      return res.status(404).json({ error: "Participante não encontrado" });
    }

    await participante.destroy();
    res.json({ message: "Participante removido com sucesso" });
  } catch (error) {
    console.error("Erro ao remover participante:", error);
    res.status(500).json({ error: "Erro ao remover participante" });
  }
});

module.exports = router;
