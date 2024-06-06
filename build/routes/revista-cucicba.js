"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revistaRoutes = void 0;
const express_1 = require("express");
const RevistaCucicbaController_1 = __importDefault(require("../controllers/matriculados/servicios/RevistaCucicbaController"));
exports.revistaRoutes = (0, express_1.Router)();
exports.revistaRoutes.get("/", RevistaCucicbaController_1.default.getAll);
exports.revistaRoutes.post("/", RevistaCucicbaController_1.default.create);
exports.revistaRoutes.patch("/:id", RevistaCucicbaController_1.default.setActive);
exports.revistaRoutes.delete("/:id", RevistaCucicbaController_1.default.delete);
exports.revistaRoutes.patch("/modificar/:id", RevistaCucicbaController_1.default.update);
