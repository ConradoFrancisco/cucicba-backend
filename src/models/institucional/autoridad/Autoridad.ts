import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../db/Database';
import AutoridadPuesto from './AutoridadPuesto';

class Autoridad extends Model {
    public id!: number;
    public nombre!: string;
    public apellido!: string;
    public avatar!: string;
    public estado!: number;
    public orden!: number;
    public puesto_id!: number;
  }
  
  Autoridad.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0
    },
    orden: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    puesto_id: {
      type: DataTypes.INTEGER,
      references: {
        model: AutoridadPuesto,
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'autoridades',
    timestamps: false
  });
  
  Autoridad.belongsTo(AutoridadPuesto, { foreignKey: 'puesto_id' });
  
  export default Autoridad;