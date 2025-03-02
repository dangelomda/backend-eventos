const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Configuração do banco de dados PostgreSQL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Definição do modelo Participante
const Participante = sequelize.define("participante", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telefone: {
    type: DataTypes.STRING(20),
  },
});

// Sincronizar o banco de dados
sequelize
  .sync()
  .then(() => console.log("\u2705 Banco de Dados sincronizado!"))
  .catch((err) => console.error("Erro ao sincronizar o banco de dados", err));

// Rotas da API
app.post("/participantes", async (req, res) => {
  try {
    const { nome, email, telefone } = req.body;
    const novoParticipante = await Participante.create({ nome, email, telefone });
    res.status(201).json(novoParticipante);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar participante", detalhes: error.message });
  }
});

app.get("/participantes", async (req, res) => {
  try {
    const participantes = await Participante.findAll();
    res.json(participantes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar participantes", detalhes: error.message });
  }
});

app.get("/participantes/:id", async (req, res) => {
  try {
    const participante = await Participante.findByPk(req.params.id);
    if (!participante) {
      return res.status(404).json({ error: "Participante não encontrado" });
    }
    res.json(participante);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar participante", detalhes: error.message });
  }
});

app.put("/participantes/:id", async (req, res) => {
  try {
    const { nome, email, telefone } = req.body;
    const participante = await Participante.findByPk(req.params.id);
    if (!participante) {
      return res.status(404).json({ error: "Participante não encontrado" });
    }
    await participante.update({ nome, email, telefone });
    res.json(participante);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar participante", detalhes: error.message });
  }
});

app.delete("/participantes/:id", async (req, res) => {
  try {
    const participante = await Participante.findByPk(req.params.id);
    if (!participante) {
      return res.status(404).json({ error: "Participante não encontrado" });
    }
    await participante.destroy();
    res.json({ message: "Participante removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir participante", detalhes: error.message });
  }
});

app.listen(port, () => {
  console.log(`\uD83C\uDF89 Servidor rodando na porta ${port}`);
});
