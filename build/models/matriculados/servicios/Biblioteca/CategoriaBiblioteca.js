"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostBiblioteca = exports.CategoriaBiblioteca = void 0;
const sequelize_1 = require("sequelize");
const Database_1 = require("../../../../db/Database"); // Ajusta la ruta según sea necesario
class CategoriaBiblioteca extends sequelize_1.Model {
}
exports.CategoriaBiblioteca = CategoriaBiblioteca;
CategoriaBiblioteca.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'categorias_biblioteca',
    sequelize: Database_1.sequelize,
    timestamps: false,
});
class PostBiblioteca extends sequelize_1.Model {
}
exports.PostBiblioteca = PostBiblioteca;
PostBiblioteca.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    categoria_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: CategoriaBiblioteca,
            key: 'id',
        },
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    descripcion: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
    archivo: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    tableName: 'posts_biblioteca',
    sequelize: Database_1.sequelize,
    timestamps: false,
});
CategoriaBiblioteca.hasMany(PostBiblioteca, { foreignKey: 'categoria_id' });
PostBiblioteca.belongsTo(CategoriaBiblioteca, { foreignKey: 'categoria_id' });
