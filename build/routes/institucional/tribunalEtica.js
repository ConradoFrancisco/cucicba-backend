"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tribunal_etica_routes = void 0;
const express_1 = require("express");
const TribunalController_1 = __importDefault(require("../../controllers/institucional/TribunalController"));
exports.tribunal_etica_routes = (0, express_1.Router)();
exports.tribunal_etica_routes.get('/', TribunalController_1.default.getAll);
exports.tribunal_etica_routes.post('/', TribunalController_1.default.create);
exports.tribunal_etica_routes.patch('/:id', TribunalController_1.default.setActive);
exports.tribunal_etica_routes.patch('/modificar/:id', TribunalController_1.default.update);
exports.tribunal_etica_routes.delete('/:id', TribunalController_1.default.delete);
