const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    charset: "utf8",
  },
  define: {
    charset: "utf8",
    collate: "utf8_general_ci",
  },
});

// 🔹 Força a sincronização do banco, garantindo que a estrutura esteja atualizada
sequelize.sync({ alter: true })
  .then(() => {
    console.log("✅ Banco de Dados sincronizado!");
  })
  .catch((error) => {
    console.error("❌ Erro ao sincronizar o banco de dados:", error);
  });

module.exports = sequelize;
