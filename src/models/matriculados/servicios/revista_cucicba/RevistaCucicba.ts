import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../../db/Database';

class RevistaCucicba extends Model {}

RevistaCucicba.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    estado: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: false,
    },
    portada: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    archivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'RevistaCucicba',
    tableName: 'revista_cucicba',
    timestamps: false,
  }
);

export default RevistaCucicba;