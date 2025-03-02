const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
  }
}, {
  timestamps: false, // 🔴 Desativa a criação automática de createdAt e updatedAt
  freezeTableName: true // 🔴 Garante que o Sequelize não tente renomear a tabela
});

module.exports = Participante;
