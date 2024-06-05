import { DataTypes } from 'sequelize';
import { sequelize } from '../../../db/Database'

const Area = sequelize.define('Area', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  orden: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue:0
  }
}, {
  tableName: 'areas', // Ajusta el nombre de la tabla si es necesario
  timestamps: false // Ajusta si tu tabla tiene timestamps
});

export default Area;