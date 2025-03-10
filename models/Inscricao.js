const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Participante = require("./Participante");
const Lab = require("./Lab");

const Inscricao = sequelize.define("Inscricao", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  participante_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Participante,
      key: "id",
    },
  },
  lab_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Lab,
      key: "id",
    },
  },
  periodo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: false,
  freezeTableName: true,
});

// 🔹 Definição das associações
Inscricao.belongsTo(Participante, { foreignKey: "participante_id" });
Inscricao.belongsTo(Lab, { foreignKey: "lab_id" });

module.exports = Inscricao;
