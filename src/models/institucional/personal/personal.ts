import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/Database";
import Area from "./area";

const Personal = sequelize.define('Personal', {
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
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El campo area no puede estar vacío'
        },
      },
      references: {
        model: Area,
        key: 'id'
      }
    }
  }, {
    tableName: 'personal',
    timestamps: false
  });
  
  Personal.belongsTo(Area, { foreignKey: 'area' });
  Area.hasMany(Personal, { foreignKey: 'area' });
  
  export default Personal;