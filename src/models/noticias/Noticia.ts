import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Database'
import Imagen from './Imagen';

class Noticia extends Model {
    public id!: number;
    public date!: Date;
    public title!: string;
    public description!: string;
    public cantFotos!: number;
    public body!: string;
    public orden!: number;
    public estado!: number;
}

Noticia.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    title: {
        type: new DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: new DataTypes.STRING(255),
        allowNull: false,
    },
    cantFotos: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
    },
    body: {
        type: new DataTypes.TEXT,
        allowNull: false,
    },
    orden: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    estado: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    tableName: 'noticias',
    sequelize,
    timestamps: false,
});



Noticia.hasMany(Imagen, { foreignKey: 'noticia_id' });
Imagen.belongsTo(Noticia, { foreignKey: 'noticia_id' });

export default Noticia