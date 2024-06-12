import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../../Database";
class PreguntasFrecuentesCategoria extends Model {}
PreguntasFrecuentesCategoria.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PreguntasFrecuentesCategorias",
    tableName: "preguntas_frecuentes_categorias",
    timestamps: false,
  }
);
export default PreguntasFrecuentesCategoria;
