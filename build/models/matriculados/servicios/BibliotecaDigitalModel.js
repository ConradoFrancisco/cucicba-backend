"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("../../../db/Database"); // Importar la instancia de la clase Database
class BibliotecaDigitalModel {
    async getAll({ category }) {
        const connection = await Database_1.db.getConnection();
        try {
            if (category) {
                const [data, _] = await connection.query("SELECT p.id AS publicacion_id, p.descripcion AS descripcion_publicacion, p.fecha AS fecha_publicacion, p.archivo AS archivo_publicacion, c.nombre AS nombre_categoria FROM posts_biblioteca p JOIN categorias_biblioteca c ON p.categoria_id = ?", [category]);
                return data;
            }
            else {
                const [data, _] = await connection.query("SELECT p.id AS publicacion_id, p.descripcion AS descripcion_publicacion, p.fecha AS fecha_publicacion, p.archivo AS archivo_publicacion, c.nombre AS nombre_categoria FROM posts_biblioteca p JOIN categorias_biblioteca c ON p.categoria_id = c.id");
                return data;
            }
        }
        finally {
            connection.release();
        }
    }
}
exports.default = new BibliotecaDigitalModel();
