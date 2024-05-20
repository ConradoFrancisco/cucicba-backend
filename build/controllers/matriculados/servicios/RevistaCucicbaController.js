"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RevistaCucicbaModel_1 = __importDefault(require("../../../models/matriculados/servicios/RevistaCucicbaModel"));
class RevistaCucicbaController {
    async getAll(_req, res) {
        const offset = parseInt(_req.query.offset);
        const limit = parseInt(_req.query.limit);
        try {
            const revistas = await RevistaCucicbaModel_1.default.getAll({ offset, limit });
            res.json(revistas);
        }
        catch (error) {
            console.error("Error al obtener las publicaciones:", error);
            res.status(500).send("Error interno del servidor");
        }
    }
}
exports.default = new RevistaCucicbaController();
