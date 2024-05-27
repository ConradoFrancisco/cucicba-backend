"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const autoridades_1 = __importDefault(require("./routes/institucional/autoridades"));
const biblioteca_digital_1 = __importDefault(require("./routes/biblioteca-digital"));
const revista_cucicba_1 = require("./routes/revista-cucicba");
const preguntas_frecuentes_1 = require("./routes/preguntas-frecuentes");
const servicios_1 = require("./routes/servicios");
const cors_1 = __importDefault(require("cors"));
const areas_1 = require("./routes/institucional/areas");
const personal_1 = require("./routes/institucional/personal");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static(path_1.default.resolve(__dirname, '../uploads')));
app.use((0, cors_1.default)());
const storage = multer_1.default.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path_1.default.extname(file.originalname); // Obtener la extensión del archivo original
        const fileName = file.fieldname + '-' + uniqueSuffix + ext; // Concatenar la extensión al nombre del archivo
        cb(null, fileName);
    }
});
const upload = (0, multer_1.default)({ storage });
app.get("/", (_req, res) => {
    console.log(path_1.default.resolve(__dirname, '../uploads'));
    res.send("cuciba backend");
});
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const filePath = req.file.path;
    return res.json({ message: 'Upload success', filePath: filePath });
});
//Enrutado de servicios
app.use("/servicios", servicios_1.serviciosRoutes);
app.use("/servicios/preguntas-frecuentes", preguntas_frecuentes_1.faqRoutes);
app.use("/servicios/revista-cucicba", revista_cucicba_1.revistaRoutes);
app.use("/servicios/biblioteca-digital", biblioteca_digital_1.default);
//Enrutado Institucional
app.use("/autoridades", autoridades_1.default);
app.use("/areas", areas_1.areasRoutes);
app.use("/personal", personal_1.personalRoutes);
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
