import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../Database";

class Imagen extends Model{}

Imagen.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  noticia_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  imageUrl: {
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'imagenes',
  sequelize,
  timestamps: false,
});

export default Imagen;