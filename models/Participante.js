const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Participante = sequelize.define("Participante", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
    type: DataTypes.STRING,
  },
  createdat: { // 🔹 Nome EXATO da tabela no banco
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedat: { // 🔹 Nome EXATO da tabela no banco
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  timestamps: false, // 🔴 Desativa createdAt e updatedAt automáticos
  freezeTableName: true // 🔴 Garante que o Sequelize não altere o nome da tabela
});

module.exports = Participante;
