require('dotenv').config();
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do banco de dados
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

// Testar conexão com o banco
sequelize.authenticate()
  .then(() => console.log('✅ Conectado ao PostgreSQL com sucesso!'))
  .catch(err => console.error('❌ Erro ao conectar ao banco:', err));

app.use(express.json()); // Suporte para JSON no body das requisições

// Definição do modelo de Evento
const Evento = sequelize.define('Evento', {
  nome: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.TEXT },
  data_inicio: { type: DataTypes.DATE, allowNull: false },
  data_fim: { type: DataTypes.DATE, allowNull: false },
  imagem_url: { type: DataTypes.STRING }
}, {
  tableName: 'eventos',
  timestamps: false
});

// Criar um evento (POST /eventos)
app.post('/eventos', async (req, res) => {
  try {
    const { nome, descricao, data_inicio, data_fim, imagem_url } = req.body;
    const evento = await Evento.create({ nome, descricao, data_inicio, data_fim, imagem_url });
    res.status(201).json(evento);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar evento', detalhes: error.message });
  }
});

// Listar todos os eventos (GET /eventos)
app.get('/eventos', async (req, res) => {
  try {
    const eventos = await Evento.findAll();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar eventos', detalhes: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('API do sistema de eventos rodando!');
});

app.listen(PORT, async () => {
  try {
    await sequelize.sync(); // Sincroniza os modelos com o banco de dados
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  } catch (error) {
    console.error('Erro ao sincronizar modelos:', error);
  }
});

