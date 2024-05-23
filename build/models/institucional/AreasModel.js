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
    async create({ title, orden }) {
        const conn = await Database_1.db.getConnection();
        try {
            await conn.query("INSERT INTO areas (title,orden) VALUES (?,?)", [
                title,
                orden,
            ]);
            console.log("ingresado a la db");
        }
        catch (e) {
            throw (new Error("Error al crear el área"), e);
        }
        finally {
            conn.release();
        }
    }
    async setActive({ id, estado }) {
        const conn = await Database_1.db.getConnection();
        try {
            await conn.query("UPDATE areas SET estado = ? WHERE id = ?", [estado, id]);
        }
        catch (e) {
            throw (new Error("Error al crear el área"), e);
        }
        finally {
            conn.release();
        }
    }
    async delete({ id }) {
        const conn = await Database_1.db.getConnection();
        try {
            const result = await conn.query("DELETE FROM areas WHERE id = ?", [id]);
        }
        catch (e) {
            throw (new Error("Error al eliminar el área"), e);
        }
        finally {
            conn.release();
        }
    }
}
exports.default = new AreasModel();
