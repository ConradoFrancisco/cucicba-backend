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
const ComisionRevisadoraModel_1 = __importDefault(require("../../models/ComisionRevisadoraModel"));
const AutoridadSchema = yup.object().shape({
    nombre: yup.string().required(),
    apellido: yup.string().required(),
    orden: yup.number().required().integer().positive(),
    posicion: yup.string().required(),
});
class ComisionRevisadora {
    async getAll(req, res) {
        let params = {};
        const input = req.query.input;
        const orden = parseInt(req.query.orden);
        const posicion = req.query.posicion;
        console.log(orden);
        const orderDirection = req.query.orderDirection || "ASC";
        const orderBy = req.query.orderBy || "id";
        const estado = parseInt(req.query.estado);
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);
        if (orderBy) {
            params = Object.assign({ orderBy }, params);
        }
        if (orderDirection) {
            params = Object.assign({ orderDirection }, params);
        }
        if (orden) {
            params = Object.assign({ orden }, params);
        }
        if (posicion) {
            params = Object.assign({ posicion }, params);
        }
        if (input) {
            params = Object.assign({ input }, params);
        }
        console.log(input);
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
            const result = await ComisionRevisadoraModel_1.default.getAll(params);
            res.json(result);
        }
        catch (e) {
            console.error("error al obtener las autoridades", e);
            res.status(500).send("error en el servidor");
        }
    }
    async create(req, res) {
        const { nombre, apellido, posicion } = req.body;
        const puesto = parseInt(req.body.puesto);
        const orden = parseInt(req.body.orden);
        try {
            // Validar los datos usando `validate` que lanzará una excepción si los datos son inválidos
            await AutoridadSchema.validate({ nombre, apellido, orden, posicion });
            // Si la validación pasa, crear el registro en la base de datos
            await ComisionRevisadoraModel_1.default.create({ nombre, apellido, orden, posicion });
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
            const result = await ComisionRevisadoraModel_1.default.setActive({ id, estado });
            res.status(200).send("Autoridad dada de alta!");
        }
        catch (e) {
            res.status(500).json({ error: "Error del servidor" });
            console.error(e);
        }
    }
    async delete(req, res) {
        const id = parseInt(req.params.id);
        try {
            const result = await ComisionRevisadoraModel_1.default.delete({ id });
            res.status(200).send("Autoridad eliminada satisfactoriamente!");
        }
        catch (e) {
            res.status(500).json({ error: "Error del servidor" });
            console.error(e);
        }
    }
    async update(req, res) {
        const id = parseInt(req.params.id);
        const { nombre, apellido, posicion } = req.body;
        const puesto_id = parseInt(req.body.puesto);
        const orden = parseInt(req.body.orden);
        try {
            await ComisionRevisadoraModel_1.default.update({ id, nombre, apellido, orden, posicion });
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
exports.default = new ComisionRevisadora();
