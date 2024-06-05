import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../../db/Database';

class InmobiliariasIlegales extends Model {}

InmobiliariasIlegales.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  causa: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue:0
  },
}, {
  sequelize,
  modelName: 'InmobiliariasIlegales',
  tableName: 'InmobiliariasIlegales',
  timestamps: false,
});

export { InmobiliariasIlegales };