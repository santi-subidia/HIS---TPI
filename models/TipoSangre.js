const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class TipoSangre extends Model {
  static associate(models) {
    TipoSangre.hasMany(models.Paciente, {
      foreignKey: 'id_tipoSangre',
      as: 'pacientes'
    });
  }
}

TipoSangre.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipo: {
      type: DataTypes.ENUM('A', 'B', 'AB', 'O'),
      allowNull: false
    },
    Rh: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'TipoSangre',
    tableName: 'tipos_sangre',
    timestamps: false
  }
);

module.exports = TipoSangre;

