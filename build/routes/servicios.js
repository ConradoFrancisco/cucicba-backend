"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviciosRoutes = void 0;
const express_1 = require("express");
const ServiciosController_1 = __importDefault(require("../controllers/matriculados/servicios/ServiciosController"));
exports.serviciosRoutes = (0, express_1.Router)();
exports.serviciosRoutes.get("/", ServiciosController_1.default.getAll);
