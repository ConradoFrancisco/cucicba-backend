import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../Database';

class AutoridadPuesto extends Model {
  public id!: number;
  public nombre!: string;
}

AutoridadPuesto.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'autoridades_puestos',
  timestamps: false
});

export default AutoridadPuesto;