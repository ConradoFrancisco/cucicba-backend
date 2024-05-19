"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BibliotecaDigitalController_1 = __importDefault(require("../controllers/matriculados/servicios/BibliotecaDigitalController"));
const bibliotecaDigitalRoutes = (0, express_1.Router)();
bibliotecaDigitalRoutes.get("/", BibliotecaDigitalController_1.default.getAll);
exports.default = bibliotecaDigitalRoutes;
