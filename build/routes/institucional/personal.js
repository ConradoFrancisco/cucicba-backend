"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.personalRoutes = void 0;
const express_1 = require("express");
const PersonalController_1 = __importDefault(require("../../controllers/institucional/PersonalController"));
exports.personalRoutes = (0, express_1.Router)();
exports.personalRoutes.get('/', PersonalController_1.default.getAll);
exports.personalRoutes.post('/', PersonalController_1.default.create);
exports.personalRoutes.patch("/:id", PersonalController_1.default.setActive);
exports.personalRoutes.patch("/modificar/:id", PersonalController_1.default.update);
exports.personalRoutes.delete("/:id", PersonalController_1.default.delete);
