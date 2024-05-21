"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const autoridades_1 = __importDefault(require("./routes/autoridades"));
const biblioteca_digital_1 = __importDefault(require("./routes/biblioteca-digital"));
const revista_cucicba_1 = require("./routes/revista-cucicba");
const preguntas_frecuentes_1 = require("./routes/preguntas-frecuentes");
const servicios_1 = require("./routes/servicios");
const cors_1 = __importDefault(require("cors"));
const areas_1 = require("./routes/institucional/areas");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (_req, res) => {
    res.send("cuciba backend");
});
//Enrutado de servicios
app.use("/servicios", servicios_1.serviciosRoutes);
app.use("/servicios/preguntas-frecuentes", preguntas_frecuentes_1.faqRoutes);
app.use("/servicios/revista-cucicba", revista_cucicba_1.revistaRoutes);
app.use("/servicios/biblioteca-digital", biblioteca_digital_1.default);
//Enrutado Institucional
app.use("/autoridades", autoridades_1.default);
app.use("/areas", areas_1.areasRoutes);
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
