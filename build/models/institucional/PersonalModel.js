"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("../../db/Database");
class PersonalModel {
    async getAll({ limit = undefined }) {
        let limitTxt = '';
        let queryParams = [];
        if (limit) {
            limitTxt = 'LIMIT ?';
            queryParams.push(limit);
        }
        const conn = await Database_1.db.getConnection();
        const query = `SELECT p.id, p.name, p.lastname, p.phone, p.email, p.position, a.title AS area FROM personal p JOIN areas a ON p.area = a.id ${limitTxt}`;
        try {
            const [data] = await conn.query(query);
            return (data);
        }
        catch (e) {
            throw new Error("Hubo un error con la db"), e;
        }
    }
}
exports.default = new PersonalModel();
