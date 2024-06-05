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
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orden: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    posicion: {
      type: DataTypes.STRING,
      allowNull: false,
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
