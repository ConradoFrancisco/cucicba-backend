"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AutoridadesController_1 = __importDefault(require("../../controllers/institucional/AutoridadesController"));
const autoridadesRoutes = (0, express_1.Router)();
autoridadesRoutes.get('/', AutoridadesController_1.default.getAll);
autoridadesRoutes.get('/cargos', AutoridadesController_1.default.getCargos);
exports.default = autoridadesRoutes;
