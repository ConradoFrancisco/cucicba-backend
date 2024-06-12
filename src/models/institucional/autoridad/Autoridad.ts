import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../Database';
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
      }
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
      }
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'El campo avatar no puede estar vacío'
        },
      },
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
      allowNull: true,
      validate: {
        isNumeric: {
          msg:'el campo orden debe ser un numero'
        },
        notEmpty: {
          msg: 'El campo orden no puede estar vacío'
        },
      },
    },
    puesto_id: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg:'el campo orden debe ser un numero'
        },
        notEmpty: {
          msg: 'El campo puesto no puede estar vacío'
        },
      },
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