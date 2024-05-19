"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const autoridades_1 = __importDefault(require("./routes/autoridades"));
const biblioteca_digital_1 = __importDefault(require("./routes/biblioteca-digital"));
const revista_cucicba_1 = require("./routes/revista-cucicba");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/servicios/revista-cucicba', revista_cucicba_1.revistaRoutes);
app.use('/autoridades', autoridades_1.default);
app.use('/servicios/biblioteca-digital', biblioteca_digital_1.default);
const PORT = 3000;
app.listen(PORT, () => {
    console.log("servidor escuchando en el puerto" + PORT);
});
