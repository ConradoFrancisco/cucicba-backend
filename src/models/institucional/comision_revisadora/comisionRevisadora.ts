import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../db/Database";

class ComisionRevisadora extends Model {}

ComisionRevisadora.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      get(){
        return this.getDataValue('nombre')
      },
      set(value: string){
        this.setDataValue('nombre', value.toUpperCase().trim());
      },
      validate: {
        notEmpty: {
          msg: 'El campo nombre no puede estar vacío'
        },
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
      }
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
          msg: 'El campo posición no puede estar vacío'
        },
      },
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "ComisionRevisadora",
    tableName: "comision_revisadora",
    timestamps: false,
  }
);

export { ComisionRevisadora };
