"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("../../db/Database");
class AreasModel {
    async getAll() {
        const conn = await Database_1.db.getConnection();
        try {
            const [data] = await conn.query("SELECT * FROM areas");
            return data;
        }
        catch (e) {
            throw new Error("no se pudo conectar a la base de datos, intentelo mas tarde");
        }
        finally {
            conn.release();
        }
    }
    async create({ title, order }) {
        const conn = await Database_1.db.getConnection();
        try {
            await conn.query("INSERT INTO areas (title,order) VALUES (?,?)", [
                title,
                order,
            ]);
        }
        catch (e) {
            throw new Error("Error al crear el área");
        }
        finally {
            conn.release();
        }
    }
}
exports.default = new AreasModel();
