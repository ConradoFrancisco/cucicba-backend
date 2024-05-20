"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServiciosModel_1 = __importDefault(require("../../../models/matriculados/servicios/ServiciosModel"));
class ServiciosController {
    async getAll(_req, res) {
        try {
            const servicios = await ServiciosModel_1.default.getAll();
            res.json(servicios);
        }
        catch (error) {
            console.error("Error al obtener los servicios:", error);
            res.status(500).send("Error interno del servidor");
        }
    }
}
exports.default = new ServiciosController();
