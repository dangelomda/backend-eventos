const express = require("express");
const multer = require("multer");
const path = require("path");
const Evento = require("../models/Evento");

const router = express.Router();

// 📌 Configuração do Multer para salvar imagens na pasta "uploads"
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// 📌 Criar um novo Evento (com upload de imagem)
router.post("/", upload.single("imagem"), async (req, res) => {
  try {
    const { nome, descricao, data_inicio, data_fim } = req.body;
    const imagem_url = req.file ? `/uploads/${req.file.filename}` : null;

    const evento = await Evento.create({
      nome,
      descricao,
      data_inicio,
      data_fim,
      imagem_url,
    });

    res.status(201).json(evento);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar evento", detalhes: error.message });
  }
});

// 📌 Listar todos os Eventos
router.get("/", async (req, res) => {
  try {
    const eventos = await Evento.findAll();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar eventos", detalhes: error.message });
  }
});

// 📌 Nova Rota: Buscar Evento por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const evento = await Evento.findByPk(id); // Busca evento pelo ID

    if (!evento) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    res.json(evento);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar evento", detalhes: error.message });
  }
});

module.exports = router;
