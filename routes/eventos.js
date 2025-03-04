const express = require("express");
const multer = require("multer");
const path = require("path");
const Evento = require("../models/Evento");

const router = express.Router();

// 📌 Configuração do Multer para salvar imagens na pasta "uploads"
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`); // Remove espaços no nome do arquivo
  },
});

const upload = multer({ storage });

// 📌 Criar um novo Evento (com upload de imagem)
router.post("/", upload.single("imagem"), async (req, res) => {
  try {
    const { nome, descricao, data_inicio, data_fim } = req.body;
    const imagem_url = req.file ? `/uploads/${req.file.filename}` : null;

    console.log("🔹 Criando evento:", { nome, descricao, data_inicio, data_fim, imagem_url });

    const evento = await Evento.create({
      nome,
      descricao,
      data_inicio: new Date(data_inicio), // Converte string para Date
      data_fim: new Date(data_fim),
      imagem_url,
    });

    res.status(201).json(evento);
  } catch (error) {
    console.error("❌ Erro ao criar evento:", error.message);
    res.status(400).json({ error: "Erro ao criar evento", detalhes: error.message });
  }
});

// 📌 Listar todos os Eventos
router.get("/", async (req, res) => {
  try {
    const eventos = await Evento.findAll();
    res.json(eventos);
  } catch (error) {
    console.error("❌ Erro ao buscar eventos:", error.message);
    res.status(500).json({ error: "Erro ao buscar eventos", detalhes: error.message });
  }
});

// 📌 Buscar Evento por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const evento = await Evento.findByPk(id);

    if (!evento) {
      console.log("❌ Evento não encontrado!");
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    res.json(evento);
  } catch (error) {
    console.error("❌ Erro ao buscar evento:", error.message);
    res.status(500).json({ error: "Erro ao buscar evento", detalhes: error.message });
  }
});

// 📌 Excluir um Evento por ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const evento = await Evento.findByPk(id);

    if (!evento) {
      console.log("❌ Evento não encontrado para exclusão!");
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    await evento.destroy();
    console.log("✅ Evento excluído com sucesso!");
    res.json({ message: "Evento excluído com sucesso!" });
  } catch (error) {
    console.error("❌ Erro ao excluir evento:", error.message);
    res.status(500).json({ error: "Erro ao excluir evento", detalhes: error.message });
  }
});

// 📌 Atualizar um Evento por ID (com suporte a imagem opcional)
router.put("/:id", upload.single("imagem"), async (req, res) => {
  try {
    const { id } = req.params;
    let { nome, descricao, data_inicio, data_fim } = req.body;

    console.log("🔹 Atualizando evento ID:", id);
    console.log("🔹 Dados recebidos:", req.body);
    console.log("🔹 Arquivo recebido:", req.file ? req.file.filename : "Nenhuma nova imagem");

    // Buscar evento pelo ID
    const evento = await Evento.findByPk(id);
    if (!evento) {
      console.log("❌ Evento não encontrado!");
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    // Atualizar a URL da imagem se um novo arquivo for enviado
    let imagem_url = evento.imagem_url;
    if (req.file) {
      imagem_url = `/uploads/${req.file.filename}`;
    }

    // Converter datas para o formato correto
    data_inicio = data_inicio ? new Date(data_inicio) : evento.data_inicio;
    data_fim = data_fim ? new Date(data_fim) : evento.data_fim;

    // Atualizar os dados do evento
    await evento.update({
      nome,
      descricao,
      data_inicio,
      data_fim,
      imagem_url,
    });

    console.log("✅ Evento atualizado com sucesso!");
    res.json({ message: "Evento atualizado com sucesso!" });
  } catch (error) {
    console.error("❌ Erro ao atualizar evento:", error.message);
    res.status(500).json({ error: "Erro ao atualizar evento", detalhes: error.message });
  }
});

module.exports = router;
