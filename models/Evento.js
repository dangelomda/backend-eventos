const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Evento = sequelize.define("Evento", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
  },
  data_inicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  data_fim: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  imagem_url: {
    type: DataTypes.STRING,
  }
}, {
  timestamps: false, // 🔹 Evita o Sequelize de criar `createdAt` e `updatedAt`
  freezeTableName: true, // 🔹 Garante que o nome da tabela não será alterado
});

module.exports = Evento;
