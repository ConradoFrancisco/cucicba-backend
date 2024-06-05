import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../../db/Database'; // Ajusta esta ruta según tu estructura de proyecto



class Infractor extends Model {}


Infractor.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  estado: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: 'infractores',
  sequelize, // passing the `sequelize` instance is required
  timestamps: false,
});

export default Infractor;