const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Participante = require("./Participante");

const Checkin = sequelize.define("Checkin", {
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
  data_checkin: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  timestamps: false,
  freezeTableName: true,
});

// Relacionamento
Checkin.belongsTo(Participante, { foreignKey: "participante_id" });

module.exports = Checkin;
