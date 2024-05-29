"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.faqRoutes = void 0;
const express_1 = require("express");
const PreguntasFrecuentesController_1 = __importDefault(require("../controllers/matriculados/servicios/PreguntasFrecuentesController"));
exports.faqRoutes = (0, express_1.Router)();
exports.faqRoutes.get("/", PreguntasFrecuentesController_1.default.getPreguntas);
exports.faqRoutes.patch("/:id", PreguntasFrecuentesController_1.default.setActive);
exports.faqRoutes.patch("/modificar/:id", PreguntasFrecuentesController_1.default.update);
exports.faqRoutes.get("/categorias", PreguntasFrecuentesController_1.default.getCategorys);
exports.faqRoutes.post("/", PreguntasFrecuentesController_1.default.create);
exports.faqRoutes.delete("/:id", PreguntasFrecuentesController_1.default.delete);
