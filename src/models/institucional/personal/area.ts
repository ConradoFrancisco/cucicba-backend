import { DataTypes } from 'sequelize';
import { sequelize } from '../../../db/Database'

const Area = sequelize.define('Area', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El campo titulo no puede estar vacío'
      },
    },
    
    get(){
      return this.getDataValue('title')
    },
    set(value: string){
      this.setDataValue('title', value.toUpperCase().trim());
    }
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
  tableName: 'areas', 
  timestamps: false 
});

export default Area;