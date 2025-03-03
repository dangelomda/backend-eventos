const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer"); // 🔹 Importando multer
const sequelize = require("./config/database");

// 🔹 Importando as rotas
const participantesRoutes = require("./routes/participantes");
const eventosRoutes = require("./routes/eventos");
const labsRoutes = require("./routes/labs");
const inscricoesRoutes = require("./routes/inscricoes");
const checkinsRoutes = require("./routes/checkins");

const app = express();
const PORT = 8080;

// 📌 Configurar CORS e JSON
app.use(cors());
app.use(express.json());

// 📌 Configurar pasta para servir imagens publicamente
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 

// 📌 Configuração do Multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Salva as imagens na pasta uploads/
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renomeia a imagem
  },
});
const upload = multer({ storage });

// 📌 Rota para upload de imagem do evento
app.post("/upload", upload.single("imagem"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Nenhum arquivo enviado." });
  }
  res.json({ url: `http://localhost:${PORT}/uploads/${req.file.filename}` });
});

// 📌 Adicionando as rotas corretamente
app.use("/participantes", participantesRoutes);
app.use("/eventos", eventosRoutes);
app.use("/labs", labsRoutes);
app.use("/inscricoes", inscricoesRoutes);
app.use("/checkins", checkinsRoutes);

console.log("📌 Sincronizando banco de dados...");
sequelize
  .sync({ force: false }) // 🔹 NÃO recria a tabela toda vez que reiniciar!
  .then(() => {
    console.log("✅ Banco de Dados sincronizado!");
  })
  .catch((error) => {
    console.error("❌ Erro ao sincronizar o banco de dados:", error);
  });

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
