import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../../db/Database';
import PreguntasFrecuentesCategorias from './PreguntasFrecuentesCategoria';


class PreguntasFrecuentes extends Model {}
PreguntasFrecuentes.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  pregunta: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  respuesta: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue:0
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PreguntasFrecuentesCategorias,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'PreguntasFrecuentes',
  tableName: 'preguntas_frecuentes',
  timestamps: false,
});

PreguntasFrecuentes.belongsTo(PreguntasFrecuentesCategorias, {
  foreignKey: 'categoria_id',
});

export default PreguntasFrecuentes ;