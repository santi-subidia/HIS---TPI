const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Turno extends Model {
  static associate(models) {
    Turno.belongsTo(models.Paciente, {
      foreignKey: 'id_paciente',
      as: 'paciente'
    });
  }
}

Turno.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_paciente: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isNotPast(value) {
          const ahora = new Date();
          const fechaTurno = new Date(value);
          if (fechaTurno < ahora) {
            throw new Error('La fecha del turno no puede estar en el pasado');
          }
        }
      }
    },
    motivo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 255],
          msg: 'El motivo debe tener entre 5 y 255 caracteres'
        }
      }
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'confirmado', 'realizado', 'cancelado'),
      allowNull: false,
      defaultValue: 'pendiente'
    }
  },
  {
    sequelize,
    modelName: 'Turno',
    tableName: 'turnos',
    timestamps: false
  }
);

module.exports = Turno;
