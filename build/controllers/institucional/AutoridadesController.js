"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AutoridadesModel_1 = __importDefault(require("../../models/AutoridadesModel"));
class AutoridadesController {
    async getAll(req, res) {
        let params = {};
        const input = req.query.input;
        const area = parseInt(req.query.area);
        const orderDirection = req.query.orderDirection || "ASC";
        const orderBy = req.query.orderBy || "id";
        const estado = parseInt(req.query.estado);
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);
        console.log(estado);
        if (orderBy) {
            params = Object.assign({ orderBy }, params);
        }
        if (orderDirection) {
            params = Object.assign({ orderDirection }, params);
        }
        if (area) {
            params = Object.assign({ area }, params);
        }
        if (input) {
            params = Object.assign({ input }, params);
        }
        if (estado || estado === 0) {
            params = Object.assign({ estado }, params);
        }
        if (limit) {
            params = Object.assign({ limit }, params);
        }
        if (offset) {
            params = Object.assign({ offset }, params);
        }
        try {
            const result = await AutoridadesModel_1.default.getAll(params);
            res.json(result);
        }
        catch (e) {
            console.error("error al obtener las areas", e);
            res.status(500).send("error en el servidor");
        }
    }
    async getCargos(req, res) {
        try {
            const result = await AutoridadesModel_1.default.getCargos();
            res.json(result);
        }
        catch (e) {
            console.error("error al obtener los cargos");
            res.status(500).send("error en el servidor");
        }
    }
}
exports.default = new AutoridadesController();
