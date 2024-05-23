"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.areasRoutes = void 0;
const express_1 = require("express");
const AreasController_1 = __importDefault(require("../../controllers/institucional/AreasController"));
exports.areasRoutes = (0, express_1.Router)();
exports.areasRoutes.get("/", AreasController_1.default.getAll);
exports.areasRoutes.post("/", AreasController_1.default.create);
exports.areasRoutes.patch("/:id", AreasController_1.default.setActive);
exports.areasRoutes.delete("/:id", AreasController_1.default.delete);
