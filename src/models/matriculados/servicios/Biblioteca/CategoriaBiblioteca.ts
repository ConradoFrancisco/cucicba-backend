import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../../../db/Database'; // Ajusta la ruta según sea necesario



class CategoriaBiblioteca extends Model {
  public id!: number;
  public nombre!: string;
}

CategoriaBiblioteca.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'categorias_biblioteca',
  sequelize,
  timestamps: false,
});

class PostBiblioteca extends Model {
  public id!: number;
  public categoria_id!: number;
  public fecha!: Date;
  public descripcion!: string;
  public estado!: number;
  public archivo?: string;
}

PostBiblioteca.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  categoria_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: CategoriaBiblioteca,
      key: 'id',
    },
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  descripcion: {
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
  estado: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
  archivo: {
    type: new DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: 'posts_biblioteca',
  sequelize,
  timestamps: false,
});
CategoriaBiblioteca.hasMany(PostBiblioteca, { foreignKey: 'categoria_id' });
PostBiblioteca.belongsTo(CategoriaBiblioteca, { foreignKey: 'categoria_id' });
export { CategoriaBiblioteca, PostBiblioteca };