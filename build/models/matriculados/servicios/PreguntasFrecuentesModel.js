"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("../../../db/Database");
class PreguntasFrecuentesModel {
    async getPreguntas({ limit = undefined, offset = 0, category = undefined, input = undefined, }) {
        let categorytxt = "";
        let inputTxt = "";
        let limitTxt = "";
        let offsetTxt = "";
        let queryParamsCount = [];
        let queryParams = [];
        if (category) {
            categorytxt = "WHERE categoria_id = ?";
            queryParams.push(category);
            queryParamsCount.push(category);
        }
        if (limit) {
            limitTxt = "LIMIT ?";
            queryParams.push(limit);
            if (offset) {
                offsetTxt = "OFFSET ?";
                queryParams.push(offset);
            }
        }
        const conn = await Database_1.db.getConnection();
        const queryCount = `SELECT COUNT(*) AS total FROM preguntas_frecuentes ${categorytxt}`;
        const query = `SELECT * FROM preguntas_frecuentes ${categorytxt} ${limitTxt} ${offsetTxt}`;
        console.log(query);
        console.log(queryParams);
        try {
            const [data] = await conn.query(query, queryParams);
            const [total] = await conn.query(queryCount);
            return { data, total };
        }
        catch (e) {
            throw new Error("No se pudieron obtener las preguntas frecuentes, intente de nuevo mas tarde");
        }
        finally {
            conn.release();
        }
    }
    async getCategorys() {
        try {
            const conn = await Database_1.db.getConnection();
            const [data] = await conn.query("SELECT * FROM preguntas_frecuentes_categorias");
            return data;
        }
        catch (e) {
            console.error("error al obtener las categorias: ", e);
        }
    }
}
exports.default = new PreguntasFrecuentesModel();
