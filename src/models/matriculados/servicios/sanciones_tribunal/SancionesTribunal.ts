import { DataTypes, Model } from "sequelize";
import { sequelize } from '../../../../Database';
import CategoriaSanciones from "./CategoriaSanciones";

class SancionesTribunal extends Model {}
SancionesTribunal.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  categoria_sancion_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue:0
  },
  pdf: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'SancionesTribunal',
  tableName: 'sanciones_tribunal',
  timestamps: false,
});

SancionesTribunal.belongsTo(CategoriaSanciones, {
  foreignKey: 'categoria_sancion_id',
});

export default SancionesTribunal;