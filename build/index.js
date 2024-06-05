"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const autoridades_1 = __importDefault(require("./routes/institucional/autoridades"));
const preguntas_frecuentes_1 = require("./routes/preguntas-frecuentes");
const cors_1 = __importDefault(require("cors"));
const areas_1 = require("./routes/institucional/areas");
const personal_1 = require("./routes/institucional/personal");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const tribunalEtica_1 = require("./routes/institucional/tribunalEtica");
const comisionRevisadora_1 = require("./routes/institucional/comisionRevisadora");
const inmobiliarias_ilegales_1 = __importDefault(require("./routes/inmobiliarias-ilegales"));
const sanciones_1 = require("./routes/sanciones");
const Database_1 = require("./db/Database");
const infractores_1 = __importDefault(require("./routes/infractores"));
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
app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '../files')));
app.use((0, cors_1.default)());
const storageFiles = multer_1.default.diskStorage({
    destination: 'files/',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path_1.default.extname(file.originalname); // Obtener la extensión del archivo original
        const fileName = file.fieldname + '-' + uniqueSuffix + ext; // Concatenar la extensión al nombre del archivo
        cb(null, fileName);
    }
});
const uploadFiles = (0, multer_1.default)({ storage: storageFiles });
const upload = (0, multer_1.default)({ storage });
app.post('/upload-multiple', upload.array('files', 10), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
    }
    const filePaths = req.files.map(file => file.path);
    return res.json({ message: 'Upload success', filePaths: filePaths });
});
app.get("/", (_req, res) => {
    console.log(path_1.default.resolve(__dirname, '../uploads'));
    res.send("cuciba backend");
});
app.post('/files', uploadFiles.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No se pudo subir el archivo' });
    }
    const filePath = req.file.path;
    return res.json({ message: 'Upload success', filePath: filePath });
});
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const filePath = req.file.path;
    return res.json({ message: 'Upload success', filePath: filePath });
});
//Enrutado de servicios
/* app.use("/servicios", serviciosRoutes); */
app.use("/servicios/preguntas-frecuentes", preguntas_frecuentes_1.faqRoutes);
app.use("/servicios/infractores", infractores_1.default);
/* app.use("/servicios/revista-cucicba", revistaRoutes);
app.use("/servicios/biblioteca-digital", bibliotecaDigitalRoutes); */
app.use("/servicios/inmobiliarias-penal", inmobiliarias_ilegales_1.default);
app.use("/servicios/sanciones", sanciones_1.sancionesRouter);
//Enrutado Institucional
app.use("/autoridades", autoridades_1.default);
app.use("/areas", areas_1.areasRoutes);
app.use("/personal", personal_1.personalRoutes);
app.use("/tribunal", tribunalEtica_1.tribunal_etica_routes);
app.use("/comision", comisionRevisadora_1.comisionRevisadoraRoutes);
//Enrutado de Noticias
/* app.use('/noticias',noticiasRoutes); */
const PORT = 8080;
(async () => {
    try {
        await Database_1.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
