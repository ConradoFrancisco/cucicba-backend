"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sancionesRouter = void 0;
const express_1 = require("express");
const SancionesController_1 = __importDefault(require("../controllers/matriculados/servicios/SancionesController"));
exports.sancionesRouter = (0, express_1.Router)();
exports.sancionesRouter.get('/', SancionesController_1.default.getAll);
exports.sancionesRouter.get('/categorias', SancionesController_1.default.getCategorias);
exports.sancionesRouter.post('/', SancionesController_1.default.create);
exports.sancionesRouter.patch('/:id', SancionesController_1.default.setActive);
exports.sancionesRouter.delete('/:id', SancionesController_1.default.delete);
exports.sancionesRouter.patch('/modificar/:id', SancionesController_1.default.update);
