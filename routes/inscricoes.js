const express = require("express");
const router = express.Router();
const Inscricao = require("../models/Inscricao");
const Participante = require("../models/Participante");
const Lab = require("../models/Lab");

// Criar uma inscrição com validações
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

// Listar todas as inscrições
router.get("/", async (req, res) => {
    try {
        const inscricoes = await Inscricao.findAll();
        res.json(inscricoes);
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar inscrições", detalhes: error.message });
    }
});

// Deletar uma inscrição
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const inscricao = await Inscricao.findByPk(id);

        if (!inscricao) {
            return res.status(404).json({ error: "Inscrição não encontrada." });
        }

        await inscricao.destroy();
        res.json({ message: "Inscrição removida com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao remover inscrição", detalhes: error.message });
    }
});

// Atualizar uma inscrição (Trocar de Lab)
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { novo_lab_id } = req.body;

        const inscricao = await Inscricao.findByPk(id);
        if (!inscricao) {
            return res.status(404).json({ error: "Inscrição não encontrada." });
        }

        // 🔹 Verifica se o novo Lab existe
        const novoLab = await Lab.findByPk(novo_lab_id);
        if (!novoLab) {
            return res.status(400).json({ error: "Novo Lab não encontrado." });
        }

        // 🔹 Verifica se o participante já está inscrito em outro Lab no mesmo período
        const conflito = await Inscricao.findOne({
            where: {
                participante_id: inscricao.participante_id,
                periodo: inscricao.periodo,
                lab_id: novo_lab_id
            }
        });
        if (conflito) {
            return res.status(400).json({ error: "Participante já está inscrito neste Lab no mesmo período." });
        }

        // 🔹 Atualiza a inscrição com o novo Lab
        inscricao.lab_id = novo_lab_id;
        await inscricao.save();

        res.json(inscricao);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar inscrição", detalhes: error.message });
    }
});

module.exports = router;
