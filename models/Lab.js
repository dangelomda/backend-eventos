const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Evento = require("./Evento"); // 🔹 Relaciona com Evento

const Lab = sequelize.define("Lab", {
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
  horario_inicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  horario_fim: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  evento_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Evento,
      key: "id"
    }
  }
}, {
  timestamps: false,
  freezeTableName: true,
});

module.exports = Lab;
