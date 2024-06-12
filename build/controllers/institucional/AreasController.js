"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AreasModel_1 = __importDefault(require("../../models/institucional/personal/AreasModel"));
class AreasController {
    async getAll(req, res) {
        let params = {};
        const input = req.query.input;
        const estado = parseInt(req.query.estado);
        const orderDirection = req.query.orderDirection || "ASC";
        const orden = parseInt(req.query.orden);
        const offset = parseInt(req.query.offset);
        const orderBy = req.query.orderBy || "id";
        console.log(orderBy);
        console.log(orderDirection);
        const limit = parseInt(req.query.limit);
        if (input) {
            params = Object.assign({ input }, params);
        }
        if (estado || estado === 0) {
            params = Object.assign({ estado }, params);
        }
        if (orden) {
            params = Object.assign({ orden }, params);
        }
        if (offset) {
            params = Object.assign({ offset }, params);
        }
        if (limit) {
            params = Object.assign({ limit }, params);
        }
        if (orderBy) {
            params = Object.assign({ orderBy }, params);
        }
        if (orderDirection) {
            params = Object.assign({ orderDirection }, params);
        }
        try {
            const results = await AreasModel_1.default.getAll(params);
            res.json(results);
        }
        catch (e) {
            console.error("error al obtener las areas", e);
            res.status(500).send("error en el servidor");
        }
    }
    async create(req, res) {
        const { title } = req.body;
        const orden = parseInt(req.body.orden);
        try {
            await AreasModel_1.default.create({ title, orden });
            res.status(201).send("Registro creado satisfactoriamente!");
        }
        catch (e) {
            // Si hay un error de validación o cualquier otro error, enviar una respuesta de error
            if (e.name === "ValidationError") {
                res.status(400).json({ error: e.errors });
            }
            else {
                res.status(500).json({ error: "Internal Server Error" });
            }
            console.error(e);
        }
    }
    async setActive(req, res) {
        const id = parseInt(req.params.id);
        const estado = req.body.estado;
        try {
            const result = await AreasModel_1.default.setActive({ id, estado });
            res.status(200).send("Area publicada satisfactoriamente!");
        }
        catch (e) {
            res.status(500).json({ error: "Internal Server Error" });
            console.error(e);
        }
    }
    async update(req, res) {
        const id = parseInt(req.params.id);
        const title = req.body.title;
        const orden = parseInt(req.body.orden);
        try {
            const result = await AreasModel_1.default.update({ id, title, orden });
            res.status(200).send("Area modificada satisfactoriamente!");
        }
        catch (e) {
            // Si hay un error de validación o cualquier otro error, enviar una respuesta de error
            if (e.name === "ValidationError") {
                res.status(400).json({ error: e.errors });
            }
            else {
                res.status(500).json({ error: "Internal Server Error" });
            }
            console.error(e);
        }
    }
    async delete(req, res) {
        const id = parseInt(req.params.id);
        try {
            const result = await AreasModel_1.default.delete({ id });
            res.status(200).send("Area eliminada satisfactoriamente!");
        }
        catch (e) {
            res.status(500).json({ error: "Internal Server Error" });
            console.error(e);
        }
    }
    async getAreasNames(req, res) {
        try {
            const result = await AreasModel_1.default.getAreasNames();
            res.json(result);
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.default = new AreasController();
