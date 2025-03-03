const express = require("express");
const router = express.Router();
const Checkin = require("../models/Checkin");
const Participante = require("../models/Participante");

// 📌 Rota para registrar um check-in via QR Code
router.post("/", async (req, res) => {
    try {
        const { participante_id } = req.body;

        // 🔹 Verifica se o participante existe
        const participante = await Participante.findByPk(participante_id);
        if (!participante) {
            return res.status(400).json({ error: "Participante não encontrado." });
        }

        // 🔹 Registra o check-in
        const novoCheckin = await Checkin.create({ participante_id });
        res.json(novoCheckin);
    } catch (error) {
        res.status(500).json({ error: "Erro ao registrar check-in", detalhes: error.message });
    }
});

// 📌 Listar todos os check-ins com nomes dos participantes
router.get("/", async (req, res) => {
    try {
        const checkins = await Checkin.findAll({
            include: [{ model: Participante, attributes: ["nome"] }]
        });

        const resultadoFormatado = checkins.map(checkin => ({
            id: checkin.id,
            participante: checkin.Participante.nome,
            data_checkin: checkin.data_checkin
        }));

        res.json(resultadoFormatado);
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar check-ins", detalhes: error.message });
    }
});

module.exports = router;
