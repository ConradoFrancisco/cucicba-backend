"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const InmobiliariasIlegalesPenalController_1 = __importDefault(require("../controllers/matriculados/servicios/InmobiliariasIlegalesPenalController"));
const inmobiliariasPenalRoutes = (0, express_1.Router)();
inmobiliariasPenalRoutes.get('/', InmobiliariasIlegalesPenalController_1.default.getAll);
inmobiliariasPenalRoutes.get('/no-causa/', InmobiliariasIlegalesPenalController_1.default.getAllNoCausa);
inmobiliariasPenalRoutes.post('/', InmobiliariasIlegalesPenalController_1.default.create);
inmobiliariasPenalRoutes.patch("/:id", InmobiliariasIlegalesPenalController_1.default.setActive);
inmobiliariasPenalRoutes.patch("/modificar/:id", InmobiliariasIlegalesPenalController_1.default.update);
inmobiliariasPenalRoutes.patch("/no-causa/modificar/:id", InmobiliariasIlegalesPenalController_1.default.updateNoCausa);
inmobiliariasPenalRoutes.delete("/:id", InmobiliariasIlegalesPenalController_1.default.delete);
exports.default = inmobiliariasPenalRoutes;
