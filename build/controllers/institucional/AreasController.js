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
    order: yup.number().required().integer().positive(),
});
class AreasController {
    async getAll(req, res) {
        try {
            const results = await AreasModel_1.default.getAll();
            res.json(results);
        }
        catch (e) {
            console.error("error al obtener las areas", e);
            res.status(500).send("error en el servidor");
        }
    }
    async create(req, res) {
        const { title, order } = req.body;
        try {
            const validation = await areaSchema.isValid({ title, order });
            if (validation) {
                await AreasModel_1.default.create({ order, title });
                res.status(201).send("Registro creado satisfactoriamente!");
            }
        }
        catch (e) {
            res.status(422);
            console.error(e);
        }
        //console.log("aca busco: ", areaSchema.isValid(title, order));
    }
}
exports.default = new AreasController();
