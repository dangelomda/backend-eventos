const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

// 🔹 Conectar ao PostgreSQL usando a variável de ambiente
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

// 🔹 Definição dos modelos do banco de dados
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

const Lab = sequelize.define('Lab', {
  nome: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.TEXT },
  horario_inicio: { type: DataTypes.DATE, allowNull: false },
  horario_fim: { type: DataTypes.DATE, allowNull: false },
  evento_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'labs',
  timestamps: false
});

// 🔹 Inicializando o Express
const app = express();
app.use(express.json());

// 🔹 Teste de conexão com o banco
sequelize.authenticate()
  .then(() => console.log("✅ Conectado ao PostgreSQL com sucesso!"))
  .catch(err => console.error("❌ Erro ao conectar ao PostgreSQL:", err));

// 🔹 Rota Principal (Teste)
app.get('/', (req, res) => {
  res.send('🚀 API do sistema de eventos rodando!');
});

// 🔹 Rotas de Eventos
app.get('/eventos', async (req, res) => {
  const eventos = await Evento.findAll();
  res.json(eventos);
});

app.post('/eventos', async (req, res) => {
  try {
    const evento = await Evento.create(req.body);
    res.status(201).json(evento);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar evento", detalhes: error.message });
  }
});

// 🔹 Rotas de Labs
app.get('/labs', async (req, res) => {
  const labs = await Lab.findAll();
  res.json(labs);
});

app.post('/labs', async (req, res) => {
  try {
    console.log("Recebendo dados do Lab:", req.body); // Debug
    const lab = await Lab.create(req.body);
    res.status(201).json(lab);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar Lab", detalhes: error.message });
  }
});

// 🔹 Inicializar Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
