import express, { Request } from "express";
import autoridadesRoutes from "./routes/institucional/autoridades";
import bibliotecaDigitalRoutes from "./routes/biblioteca-digital";
import { revistaRoutes } from "./routes/revista-cucicba";
import { faqRoutes } from "./routes/preguntas-frecuentes";
import { serviciosRoutes } from "./routes/servicios";
import cors from "cors";
import { areasRoutes } from "./routes/institucional/areas";
import { personalRoutes } from "./routes/institucional/personal";
import multer from 'multer'
import path from "path";
const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));
app.use(cors());
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname); // Obtener la extensión del archivo original
    const fileName = file.fieldname + '-' + uniqueSuffix + ext; // Concatenar la extensión al nombre del archivo
    cb(null, fileName);
  }
});

const upload = multer({ storage });
app.get("/", (_req: Request, res) => {
  console.log(path.resolve(__dirname, '../uploads'));
  res.send("cuciba backend");
});
app.post('/upload', upload.single('file'), (req:Request, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const filePath = req.file.path
  return res.json({ message: 'Upload success', filePath: filePath });
});
//Enrutado de servicios
app.use("/servicios", serviciosRoutes);
app.use("/servicios/preguntas-frecuentes", faqRoutes);
app.use("/servicios/revista-cucicba", revistaRoutes);
app.use("/servicios/biblioteca-digital", bibliotecaDigitalRoutes);
//Enrutado Institucional
app.use("/autoridades", autoridadesRoutes);
app.use("/areas", areasRoutes);
app.use("/personal", personalRoutes);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
