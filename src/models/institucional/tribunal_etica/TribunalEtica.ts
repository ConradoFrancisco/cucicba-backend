import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../db/Database';

class TribunalEtica extends Model {}

TribunalEtica.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El campo nombre no puede estar vacío'
      },
    },
    get(){
      return this.getDataValue('nombre')
    },
    set(value: string){
      this.setDataValue('nombre', value.toUpperCase().trim());
    },
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El campo apellido no puede estar vacío'
      },
    },
    get(){
      return this.getDataValue('apellido')
    },
    set(value: string){
      this.setDataValue('apellido', value.toUpperCase().trim());
    },
  },
  orden: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El campo orden no puede estar vacío'
      },
    },
  },
  posicion: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El campo posicion no puede estar vacío'
      },
    },
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue:0
  },
}, {
  sequelize,
  modelName: 'TribunalEtica',
  tableName: 'tribunal_etica',
  timestamps: false,
});

export { TribunalEtica };