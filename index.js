const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const participantesRoutes = require("./routes/participantes"); // 🔹 Importa as rotas de participantes

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// 🔹 Adicionando a rota de Participantes
app.use("/participantes", participantesRoutes);

console.log("📌 Sincronizando banco de dados...");
sequelize.sync({ force: false }) // 🔹 NÃO recria a tabela toda vez que reiniciar!
  .then(() => {
    console.log("✅ Banco de Dados sincronizado!");
  })
  .catch((error) => {
    console.error("❌ Erro ao sincronizar o banco de dados:", error);
  });

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
