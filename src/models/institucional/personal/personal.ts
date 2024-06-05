import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/Database";
import Area from "./area";

const Personal = sequelize.define('Personal', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0
    }
  }, {
    tableName: 'personal',
    timestamps: false
  });
  
  Personal.belongsTo(Area, { foreignKey: 'area' });
  Area.hasMany(Personal, { foreignKey: 'area' });
  
  export default Personal;