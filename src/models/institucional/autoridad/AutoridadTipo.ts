import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../db/Database';

export class AutoridadTipo extends Model {}

AutoridadTipo.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    get(){
      return this.getDataValue('nombre')
    },
    set(value: string){
      this.setDataValue('nombre', value.toUpperCase().trim());
    }
  }
}, {
  sequelize,
  tableName: 'autoridades_tipos',
  timestamps: true
});