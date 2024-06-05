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
const NoticiasModel_1 = __importDefault(require("../../models/noticias/NoticiasModel"));
const Yup = __importStar(require("yup"));
const NoticiasModel_2 = __importDefault(require("../../models/noticias/NoticiasModel"));
const noticiaSchema = Yup.object().shape({
    title: Yup.string().required("El título es requerido"),
    date: Yup.date().required("La fecha es requerida"),
    orden: Yup.number().required("El orden es requerido"),
    description: Yup.string().required("La descripción es requerida"),
    content: Yup.string().required("El cuerpo de la noticia es requerido"),
});
class NoticiasController {
    async getAll(req, res) {
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);
        const input = req.query.input;
        let params = {};
        if (limit) {
            params = Object.assign({ limit }, params);
        }
        if (input) {
            params = Object.assign({ input }, params);
        }
        if (offset) {
            params = Object.assign({ offset }, params);
        }
        try {
            const response = await NoticiasModel_1.default.getAll(params);
            res.status(200);
            res.json(response);
        }
        catch (e) {
            console.error("error al obtener las noticias", e);
            res.status(500).send("error en el servidor");
        }
    }
    async getById(req, res) {
        const id = parseInt(req.params.id);
        console.log("aca", id);
        try {
            const response = await NoticiasModel_1.default.getByid({ id });
            res.status(200);
            res.json(response);
        }
        catch (e) {
            console.error("error al obtener las noticias", e);
            res.status(500).send("error en el servidor");
        }
    }
    async create(req, res) {
        const { date, title, description, body } = req.body;
        const orden = parseInt(req.body.orden);
        try {
            await noticiaSchema.validate({
                title,
                date,
                orden,
                description,
                content: body,
            });
            const insertId = await NoticiasModel_1.default.create({
                date,
                title,
                description,
                body,
                orden,
            });
            res.status(201).json({ message: "Noticia creada", insertId: insertId });
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
    async createImagesRegister(req, res) {
        const files = req.body.files;
        const id = parseInt(req.body.id);
        try {
            await NoticiasModel_1.default.createImagesRegister({
                id_noticia: id,
                filePaths: files,
            });
            res
                .status(201)
                .json({ message: "Noticia creada e imagenes subidas correctamente!" });
        }
        catch (e) {
            res.status(500).json({ error: "Error del servidor" });
            throw new Error("error al subir las imagenes a la db");
        }
    }
    async setActive(req, res) {
        const id = parseInt(req.params.id);
        const estado = req.body.estado;
        try {
            const result = await NoticiasModel_2.default.setActive({ id, estado });
            res.status(200).send("Noticia Publicada satisfactoriamente!");
            return res.json(result);
        }
        catch (e) {
            res.status(500).json({ error: "Internal Server Error" });
            console.error(e);
        }
    }
}
exports.default = new NoticiasController();
