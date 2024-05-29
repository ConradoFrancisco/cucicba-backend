"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comisionRevisadoraRoutes = void 0;
const express_1 = require("express");
const ComisionRevisadoraController_1 = __importDefault(require("../../controllers/institucional/ComisionRevisadoraController"));
exports.comisionRevisadoraRoutes = (0, express_1.Router)();
exports.comisionRevisadoraRoutes.get('/', ComisionRevisadoraController_1.default.getAll);
exports.comisionRevisadoraRoutes.post('/', ComisionRevisadoraController_1.default.create);
exports.comisionRevisadoraRoutes.patch('/:id', ComisionRevisadoraController_1.default.setActive);
exports.comisionRevisadoraRoutes.patch('/modificar/:id', ComisionRevisadoraController_1.default.update);
exports.comisionRevisadoraRoutes.delete('/:id', ComisionRevisadoraController_1.default.delete);
