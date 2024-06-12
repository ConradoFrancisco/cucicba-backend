import { DataTypes } from 'sequelize';
import { sequelize } from '../../../Database'

const Area = sequelize.define('Area', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    get(){
      return this.getDataValue('title')
    },
    set(value: string){
      this.setDataValue('title', value.toUpperCase().trim());
    },
    validate: {
      notEmpty: {
        msg: 'El campo title no puede estar vacío'
      },
    },
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