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
const BibliotecaDigitalModel_1 = __importDefault(require("../../../models/matriculados/servicios/Biblioteca/BibliotecaDigitalModel"));
const Yup = __importStar(require("yup"));
const postSchema = Yup.object().shape({
    categoria_id: Yup.number().required("La categoria es requerida"),
    fecha: Yup.date().required("La fecha es requerida"),
    descripcion: Yup.string().required("La descripción es requerida"),
    archivo: Yup.string().required("El cuerpo de la noticia es requerido"),
});
class BibliotecaDigitalController {
    async getAll(req, res) {
        let params = {};
        const input = req.query.input;
        const fecha = parseInt(req.query.fecha);
        const categoria = parseInt(req.query.categoria);
        console.log(fecha);
        const orderDirection = req.query.orderDirection || "ASC";
        const orderBy = req.query.orderBy || "id";
        const estado = parseInt(req.query.estado);
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);
        if (orderBy) {
            params = Object.assign({ orderBy }, params);
        }
        if (categoria) {
            params = Object.assign({ categoria_id: categoria }, params);
        }
        if (orderDirection) {
            params = Object.assign({ orderDirection }, params);
        }
        if (fecha) {
            params = Object.assign({ fecha }, params);
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
            const result = await BibliotecaDigitalModel_1.default.getAll(params);
            res.json(result);
        }
        catch (e) {
            console.error("error al obtener las inmobiliarias Ilegales", e);
            res.status(500).send("error en el servidor");
        }
    }
    async create(req, res) {
        const { pdf, descripcion, fecha } = req.body;
        const categoria_id = parseInt(req.body.categoria);
        console.log(req.body);
        try {
            // Validar los datos usando `validate` que lanzará una excepción si los datos son inválidos
            await postSchema.validate({ categoria_id, fecha, descripcion, archivo: pdf });
            // Si la validación pasa, crear el registro en la base de datos
            await BibliotecaDigitalModel_1.default.create({ categoria_id, fecha, descripcion, archivo: pdf });
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
    async getAllCategories(req, res) {
        try {
            const categorias = await BibliotecaDigitalModel_1.default.getAllCategories();
            res.json(categorias);
        }
        catch (e) {
            console.error("error al obtener las inmobiliarias Ilegales", e);
            res.status(500).send("error en el servidor");
        }
    }
    async setActive(req, res) {
        const id = parseInt(req.params.id);
        const estado = req.body.estado;
        try {
            const result = await BibliotecaDigitalModel_1.default.setActive({ id, estado });
            res.status(200).send("Inmobiliaria Ilegal Publicada");
            return res.json(result);
        }
        catch (e) {
            res.status(500).json({ error: "Error del servidor" });
            console.error(e);
        }
    }
    async delete(req, res) {
        console.log("hola");
        const id = parseInt(req.params.id);
        try {
            const result = await BibliotecaDigitalModel_1.default.delete({ id });
            res.status(200).send("post eliminado con éxito");
            return res.json(result);
        }
        catch (e) {
            res.status(500).json({ error: "Error del servidor" });
            console.error(e);
        }
    }
    async update(req, res) {
        const id = parseInt(req.params.id);
        const { pdf, descripcion, date } = req.body;
        const categoria_id = parseInt(req.body.categoria_id);
        try {
            await BibliotecaDigitalModel_1.default.update({ id, categoria_id, fecha: date, descripcion, archivo: pdf });
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
exports.default = new BibliotecaDigitalController();
