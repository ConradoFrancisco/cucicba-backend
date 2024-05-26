"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup = __importStar(require("yup"));
const AreasModel_1 = __importDefault(require("../../models/institucional/AreasModel"));
const areaSchema = yup.object().shape({
    title: yup.string().required(),
    orden: yup.number().required().integer().positive(),
});
class AreasController {
    async getAll(req, res) {
        let params = {};
        const input = req.query.input;
        const estado = parseInt(req.query.estado);
        const orderDirection = req.query.orderDirection || 'ASC';
        const orden = parseInt(req.query.orden);
        const offset = parseInt(req.query.offset);
        const orderBy = req.query.orderBy || 'id';
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
            // Validar los datos usando `validate` que lanzará una excepción si los datos son inválidos
            await areaSchema.validate({ title, orden });
            // Si la validación pasa, crear el registro en la base de datos
            await AreasModel_1.default.create({ title, orden });
            res.status(201).send("Registro creado satisfactoriamente!");
        }
        catch (e) {
            // Si hay un error de validación o cualquier otro error, enviar una respuesta de error
            if (e.name === 'ValidationError') {
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
            return res.json(result);
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
        await areaSchema.validate({ title, orden });
        try {
            const result = await AreasModel_1.default.update({ id, title, orden });
            res.status(200).send("Area modificada satisfactoriamente!");
            return res.json(result);
        }
        catch (e) {
            // Si hay un error de validación o cualquier otro error, enviar una respuesta de error
            if (e.name === 'ValidationError') {
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
            return res.json(result);
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
