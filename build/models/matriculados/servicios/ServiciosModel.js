"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Servicio_1 = __importDefault(require("./Servicio")); // Asegúrate de ajustar la ruta según sea necesario
class ServiciosModel {
    async getAll() {
        try {
            const data = await Servicio_1.default.findAll({
                where: {
                    activo: true
                }
            });
            return data;
        }
        catch (e) {
            console.error('Error al obtener los servicios: ', e);
            throw new Error("No se pudieron obtener los servicios, intente de nuevo más tarde");
        }
    }
}
exports.default = new ServiciosModel();
