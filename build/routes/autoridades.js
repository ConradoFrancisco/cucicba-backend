"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AutoridadesModel_1 = require("../models/AutoridadesModel");
const autoridadesRoutes = (0, express_1.Router)();
autoridadesRoutes.get('/', AutoridadesModel_1.getCon);
exports.default = autoridadesRoutes;
