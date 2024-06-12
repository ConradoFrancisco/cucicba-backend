"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PersonalModel_1 = __importDefault(require("../../models/institucional/personal/PersonalModel"));
class PersonalController {
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
            const result = await PersonalModel_1.default.getAll(params);
            res.json(result);
        }
        catch (e) {
            console.error("error al obtener las areas", e);
            res.status(500).send("error en el servidor");
        }
    }
    async getAllByAreas(req, res) {
        try {
            const response = await PersonalModel_1.default.getAllByAreas();
            res.json(response);
        }
        catch (e) {
            console.error("error al obtener las areas", e);
            res.status(500).send("error en el servidor");
        }
    }
    async create(req, res) {
        const { nombre, apellido, cargo } = req.body;
        const area = parseInt(req.body.area);
        console.log(req.body);
        let params = { nombre, apellido, cargo, area };
        if (req.body.telefono) {
            const telefono = req.body.telefono.toString();
            params = Object.assign({ telefono }, params);
        }
        if (req.body.email) {
            const email = req.body.email;
            params = Object.assign({ email }, params);
        }
        console.log(params);
        try {
            await PersonalModel_1.default.create(params);
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
    async update(req, res) {
        const id = parseInt(req.params.id);
        const { nombre, apellido, cargo } = req.body;
        const area = parseInt(req.body.area);
        console.log(req.body);
        let params = { id, nombre, apellido, cargo, area };
        if (req.body.telefono) {
            const telefono = req.body.telefono.toString();
            params = Object.assign({ telefono }, params);
        }
        if (req.body.email) {
            const email = req.body.email;
            params = Object.assign({ email }, params);
        }
        console.log(params);
        try {
            await PersonalModel_1.default.update(params);
            res.status(200).send("Registro modificado satisfactoriamente!");
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
            const result = await PersonalModel_1.default.setActive({ id, estado });
            res.status(200).send("Personal dado de alta satisfactoriamente!");
        }
        catch (e) {
            res.status(500).json({ error: "Internal Server Error" });
            console.error(e);
        }
    }
    async delete(req, res) {
        const id = parseInt(req.params.id);
        try {
            const result = await PersonalModel_1.default.delete({ id });
            res.status(200).send("Personal eliminado satisfactoriamente!");
        }
        catch (e) {
            res.status(500).json({ error: "Internal Server Error" });
            console.error(e);
        }
    }
}
exports.default = new PersonalController();
