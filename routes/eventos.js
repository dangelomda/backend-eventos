const express = require("express");
const Evento = require("../models/Evento"); // 🔹 Importa o modelo de Evento

const router = express.Router();

// 📌 Criar um novo evento
router.post("/", async (req, res) => {
  try {
    const evento = await Evento.create(req.body);
    res.status(201).json(evento);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar evento", detalhes: error.message });
  }
});

// 📌 Listar todos os eventos
router.get("/", async (req, res) => {
  try {
    const eventos = await Evento.findAll();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar eventos", detalhes: error.message });
  }
});

module.exports = router;
