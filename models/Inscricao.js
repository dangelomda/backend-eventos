const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Inscricao = sequelize.define("Inscricao", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  participante_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lab_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  periodo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Inscricao;
