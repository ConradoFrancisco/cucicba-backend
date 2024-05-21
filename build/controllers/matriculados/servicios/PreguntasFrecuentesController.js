"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PreguntasFrecuentesModel_1 = __importDefault(require("../../../models/matriculados/servicios/PreguntasFrecuentesModel"));
class PreguntasFrecuentesController {
    async getPreguntas(req, res) {
        let params = {};
        const offset = parseInt(req.query.offset);
        const limit = parseInt(req.query.limit);
        const category = parseInt(req.query.category);
        const input = req.query.input;
        if (input) {
            params = Object.assign({ input }, params);
        }
        if (category) {
            params = Object.assign({ category }, params);
        }
        if (offset) {
            params = Object.assign({ offset }, params);
        }
        if (limit) {
            params = Object.assign({ limit }, params);
        }
        try {
            const results = await PreguntasFrecuentesModel_1.default.getPreguntas(params);
            res.json(results);
        }
        catch (error) {
            console.error("Error al obtener las preguntas frecuentes:", error);
            res.status(500).send("error interno del servidor");
        }
    }
    async getCategorys(req, res) {
        try {
            const results = await PreguntasFrecuentesModel_1.default.getCategorys();
            res.json(results);
        }
        catch (e) {
            console.error("Error al obtener las categorias, intentelo mas tarde");
            res.status(500).send("arror intero del servidor");
        }
    }
}
exports.default = new PreguntasFrecuentesController();
