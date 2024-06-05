"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const InfractoresController_1 = __importDefault(require("../controllers/matriculados/servicios/InfractoresController"));
const infractoresRoutes = (0, express_1.Router)();
infractoresRoutes.get('/', InfractoresController_1.default.getAll);
infractoresRoutes.post('/', InfractoresController_1.default.create);
infractoresRoutes.patch("/:id", InfractoresController_1.default.setActive);
infractoresRoutes.patch("/modificar/:id", InfractoresController_1.default.update);
infractoresRoutes.delete("/:id", InfractoresController_1.default.delete);
exports.default = infractoresRoutes;
