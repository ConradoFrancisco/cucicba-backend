"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PersonalModel_1 = __importDefault(require("../../models/institucional/PersonalModel"));
class PersonalController {
    async getAll(req, res) {
        let params = {};
        const limit = parseInt(req.query.limit);
        if (limit) {
            params = Object.assign({ limit }, params);
        }
        try {
            const result = await PersonalModel_1.default.getAll(params);
            res.json(result);
        }
        catch (e) {
            console.error("error al obtener las areas", e);
            res.status(500).send("error en el servidor");
        }
    }
}
exports.default = new PersonalController();
