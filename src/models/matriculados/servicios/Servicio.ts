import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../Database';
class Servicio extends Model {
    public id!: number;
    public title!: string;
    public url!: string;
    public icon!: string;
    public order!: number;
    public activo!: boolean;
}

Servicio.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: new DataTypes.STRING(255),
        allowNull: false,
    },
    url: {
        type: new DataTypes.STRING(255),
        allowNull: false,
    },
    icon: {
        type: new DataTypes.STRING(255),
        allowNull: false,
    },
    orden: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    tableName: 'services',
    sequelize,
    timestamps: false,
});

export default Servicio;