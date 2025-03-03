const express = require("express");
const router = express.Router();
const Inscricao = require("../models/Inscricao");
const Participante = require("../models/Participante");
const Lab = require("../models/Lab");

// Criar uma inscrição com validações, incluindo limite de vagas
router.post("/", async (req, res) => {
    try {
        const { participante_id, lab_id, periodo } = req.body;

        // 🔹 Verifica se o participante existe
        const participante = await Participante.findByPk(participante_id);
        if (!participante) {
            return res.status(400).json({ error: "Participante não encontrado." });
        }

        // 🔹 Verifica se o Lab existe
        const lab = await Lab.findByPk(lab_id);
        if (!lab) {
            return res.status(400).json({ error: "Lab não encontrado." });
        }

        // 🔹 Verifica se o Lab tem limite de vagas e se já atingiu esse limite
        if (lab.limite_vagas !== null) { // Se houver limite de vagas
            const inscritosNoLab = await Inscricao.count({ where: { lab_id } });
            if (inscritosNoLab >= lab.limite_vagas) {
                return res.status(400).json({ error: "Este Lab já atingiu o limite de vagas." });
            }
        }

        // 🔹 Verifica se já existe uma inscrição para esse participante no mesmo período
        const inscricaoExistente = await Inscricao.findOne({
            where: { participante_id, periodo }
        });
        if (inscricaoExistente) {
            return res.status(400).json({ error: "Participante já está inscrito em outro Lab neste período." });
        }

        // 🔹 Cria a inscrição
        const novaInscricao = await Inscricao.create({
            participante_id,
            lab_id,
            periodo
        });

        res.json(novaInscricao);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar inscrição", detalhes: error.message });
    }
});

// Listar todas as inscrições com nomes completos
router.get("/", async (req, res) => {
    try {
        const inscricoes = await Inscricao.findAll({
            include: [
                { model: Participante, attributes: ["nome"] },
                { model: Lab, attributes: ["nome"] }
            ]
        });

        const resultadoFormatado = inscricoes.map(inscricao => ({
            id: inscricao.id,
            participante: inscricao.Participante.nome,
            lab: inscricao.Lab.nome,
            periodo: inscricao.periodo
        }));

        res.json(resultadoFormatado);
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar inscrições", detalhes: error.message });
    }
});

module.exports = router;
