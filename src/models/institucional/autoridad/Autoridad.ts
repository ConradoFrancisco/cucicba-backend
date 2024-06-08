import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../db/Database';
import { AutoridadTipo } from './AutoridadTipo';

export interface IAutoridadAttributes {
  nombre: string;
  apellido: string;
  avatar: string;
  puesto: AutoridadTipo;
  orden: number;
}

class Autoridad extends Model {}
  
  Autoridad.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'El campo nombre no puede estar vacío'
        },
        isNull: {
          msg: 'El campo nombre no puede ser nulo'
        },
      },
      allowNull: false,
      get(){
        return this.getDataValue('nombre')
      },
      set(value: string){
        this.setDataValue('nombre', value.toUpperCase().trim());
      }
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
      get(){
        return this.getDataValue('apellido')
      },
      set(value: string){
        this.setDataValue('apellido', value.toUpperCase().trim());
      }
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      get(){
        return this.getDataValue('avatar')
      },
      set(value: string){
        this.setDataValue('avatar', value.trim());
      }
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
        model: AutoridadTipo,
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'autoridades',
    timestamps: false
  });
  
  Autoridad.belongsTo(AutoridadTipo, { foreignKey: 'puesto_id' });
  
  export default Autoridad;