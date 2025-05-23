const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Paciente extends Model {
  static associate(models) {
    Paciente.belongsTo(models.TipoSangre, {
      foreignKey: 'id_tipoSangre',
      as: 'tipoSangre'
    });

    Paciente.hasMany(models.Turno, {
      foreignKey: 'id_paciente',
      as: 'turnos'
    });

    Paciente.hasMany(models.PacienteSeguro, {
      foreignKey: 'id_paciente',
      as: 'seguros'
    });
  }
}

Paciente.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    DNI: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        len: [7, 8]
      }
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: [/^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]+$/],
          msg: 'El nombre solo puede contener letras y espacios'
        }
      }
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: [/^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]+$/],
          msg: 'El apellido solo puede contener letras y espacios'
        }
      }
    },
    sexo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: {
          args: [[0, 1, 2]], // Por ejemplo: 0 = otro, 1 = masculino, 2 = femenino
          msg: 'Sexo debe ser 0, 1 o 2'
        }
      }
    },
    domicilio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nro_Telefono: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: [/^[0-9]{6,15}$/],
          msg: 'El número de teléfono debe contener solo dígitos (6 a 15 caracteres)'
        }
      }
    },
    id_tipoSangre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fechaNacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: true,
            isNotFuture(value) {
                const hoy = new Date();
                const fecha = new Date(value);
                if (fecha >= hoy) {
                    throw new Error('La fecha de nacimiento no puede estar en el futuro');
                }
            }
        }
    }
  },
  {
    sequelize,
    modelName: 'Paciente',
    tableName: 'pacientes',
    timestamps: false
  }
);

module.exports = Paciente;

