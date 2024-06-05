"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PreguntasFrecuentesModel_1 = __importDefault(require("../../../models/matriculados/servicios/preguntas_frecuentes/PreguntasFrecuentesModel"));
class PreguntasFrecuentesController {
    async getPreguntas(req, res) {
        let params = {};
        const offset = parseInt(req.query.offset);
        const estado = parseInt(req.query.estado);
        const limit = parseInt(req.query.limit);
        const orderDirection = req.query.orderDirection || "ASC";
        const orderBy = req.query.orderBy || "id";
        const puesto = parseInt(req.query.puesto);
        const input = req.query.input;
        if (orderBy) {
            params = Object.assign({ orderBy }, params);
        }
        if (orderDirection) {
            params = Object.assign({ orderDirection }, params);
        }
        if (estado || estado === 0) {
            params = Object.assign({ estado }, params);
        }
        if (input) {
            params = Object.assign({ input }, params);
        }
        if (puesto) {
            params = Object.assign({ category: puesto }, params);
        }
        if (offset) {
            params = Object.assign({ offset }, params);
        }
        if (limit) {
            params = Object.assign({ limit }, params);
        }
        console.log(puesto);
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
    async create(req, res) {
        const { pregunta, respuesta } = req.body;
        const categoria = parseInt(req.body.categoria);
        try {
            await PreguntasFrecuentesModel_1.default.create({ pregunta, respuesta, categoria });
            res.status(201).send("Registro creado satisfactoriamente!");
        }
        catch (e) {
            // Si hay un error de validación o cualquier otro error, enviar una respuesta de error
            if (e.name === "ValidationError") {
                res.status(400).json({ error: e.errors });
            }
            else {
                res.status(500).json({ error: "Error del servidor" });
            }
            console.error(e);
        }
    }
    async setActive(req, res) {
        const id = parseInt(req.params.id);
        const estado = req.body.estado;
        try {
            const result = await PreguntasFrecuentesModel_1.default.setActive({ id, estado });
            res.status(200).send("Pregunta Frecuente Publicada dada de alta!");
            return res.json(result);
        }
        catch (e) {
            res.status(500).json({ error: "Error del servidor" });
            console.error(e);
        }
    }
    async delete(req, res) {
        const id = parseInt(req.params.id);
        try {
            const result = await PreguntasFrecuentesModel_1.default.delete({ id });
            res.status(200).send("Pregunta eliminada satisfactoriamente!");
            return res.json(result);
        }
        catch (e) {
            res.status(500).json({ error: "Error del servidor" });
            console.error(e);
        }
    }
    async update(req, res) {
        const { pregunta, respuesta } = req.body;
        const categoria = parseInt(req.body.categoria);
        const id = parseInt(req.params.id);
        try {
            await PreguntasFrecuentesModel_1.default.update({ id, categoria, pregunta, respuesta });
            res.status(201).send("Registro Modificado correctamente!");
        }
        catch (e) {
            // Si hay un error de validación o cualquier otro error, enviar una respuesta de error
            if (e.name === "ValidationError") {
                res.status(400).json({ error: e.errors });
            }
            else {
                res.status(500).json({ error: "Error del servidor" });
            }
            console.error(e);
        }
    }
}
exports.default = new PreguntasFrecuentesController();
