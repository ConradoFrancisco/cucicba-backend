import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../../db/Database';

class CategoriaSancion extends Model {}
CategoriaSancion.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'CategoriaSancion',
  tableName: 'categoria_sanciones',
  timestamps: false,
});

export default CategoriaSancion;