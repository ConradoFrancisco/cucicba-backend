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
        if (category && input) {
            inputTxt = `WHERE pregunta like ?`;
            queryParams.push(input);
            queryParamsCount.push(input);
            categorytxt = `AND categoria_id = ?`;
            queryParams.push(category);
            queryParamsCount.push(category);
        }
        else if (category) {
            categorytxt = `WHERE categoria_id = ?`;
            queryParams.push(category);
            queryParamsCount.push(category);
        }
        else if (input) {
            inputTxt = `WHERE pregunta like ?`;
            queryParams.push(input);
            queryParamsCount.push(input);
        }
        if (limit) {
            limitTxt = "LIMIT ?";
            queryParams.push(limit);
            queryParamsCount.push(limit);
            if (offset) {
                offsetTxt = "OFFSET ?";
                queryParams.push(offset);
            }
        }
        const conn = await Database_1.db.getConnection();
        const queryCount = `SELECT COUNT(*) AS total FROM preguntas_frecuentes ${inputTxt} ${categorytxt} `;
        const query = `SELECT * FROM preguntas_frecuentes ${inputTxt} ${categorytxt} ${limitTxt} ${offsetTxt}`;
        console.log("queryresults:", query);
        console.log("queryparamsresults:", queryParams);
        console.log("querycant:", queryCount);
        console.log("queryparamscant:", queryParamsCount);
        try {
            const [data] = await conn.query(query, queryParams);
            const [total] = await conn.query(queryCount, queryParamsCount);
            return { data, total };
        }
        catch (e) {
            throw new Error("No se pudieron obtener las preguntas frecuentes, intente de nuevo mas tarde: "), e;
        }
        finally {
            conn.release();
        }
    }
    async getCategorys() {
        const conn = await Database_1.db.getConnection();
        try {
            const [data] = await conn.query("SELECT * FROM preguntas_frecuentes_categorias");
            return data;
        }
        catch (e) {
            console.error("error al obtener las categorias: ", e);
        }
        finally {
            conn.release();
        }
    }
}
exports.default = new PreguntasFrecuentesModel();
