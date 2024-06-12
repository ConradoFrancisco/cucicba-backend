"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noticiasRoutes = void 0;
const express_1 = require("express");
const NoticiasController_1 = __importDefault(require("../../controllers/noticias/NoticiasController"));
exports.noticiasRoutes = (0, express_1.Router)();
exports.noticiasRoutes.get('/', NoticiasController_1.default.getAll);
exports.noticiasRoutes.get('/:id', NoticiasController_1.default.getById);
exports.noticiasRoutes.patch('/:id', NoticiasController_1.default.setActive);
exports.noticiasRoutes.patch('/modificar/:id', NoticiasController_1.default.update);
exports.noticiasRoutes.delete('/:id', NoticiasController_1.default.delete);
exports.noticiasRoutes.post('/', NoticiasController_1.default.create);
exports.noticiasRoutes.post('/images/', NoticiasController_1.default.createImagesRegister);
