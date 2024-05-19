"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BibliotecaDigitalModel_1 = __importDefault(require("../../../models/matriculados/servicios/BibliotecaDigitalModel"));
class BibliotecaDigitalController {
    async getAll(req, res) {
        const category = parseInt(req.query.category, 10);
        try {
            const publicaciones = await BibliotecaDigitalModel_1.default.getAll({ category });
            res.json(publicaciones);
        }
        catch (error) {
            console.error("Error al obtener las publicaciones:", error);
            res.status(500).send("Error interno del servidor");
        }
    }
}
exports.default = new BibliotecaDigitalController();
