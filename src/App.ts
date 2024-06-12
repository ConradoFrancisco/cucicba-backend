import * as express from "express";
import * as dotenv from "dotenv";
import * as cors from "cors";
import bodyParser = require("body-parser");
import path = require("path");
import { getConnection } from "./Database";

// import express, { Request, Response } from "express";
// import autoridadesRoutes from "./routes/institucional/autoridades";
// import bibliotecaDigitalRoutes from "./routes/biblioteca-digital";
// import { revistaRoutes } from "./routes/revista-cucicba";
// import { faqRoutes } from "./routes/preguntas-frecuentes";
// import { serviciosRoutes } from "./routes/servicios";
// import cors from "cors";
// import { areasRoutes } from "./routes/institucional/areas";
// import { personalRoutes } from "./routes/institucional/personal";
// import multer,{ MulterError } from 'multer'
// import path from "path";
// import { tribunal_etica_routes } from "./routes/institucional/tribunalEtica";
// import { comisionRevisadoraRoutes } from "./routes/institucional/comisionRevisadora";
// import inmobiliariasPenalRoutes from "./routes/inmobiliarias-ilegales";
// import { sancionesRouter } from "./routes/sanciones";
// import { noticiasRoutes } from "./routes/noticias/noticias";
// import { DbConnection } from "./db/Database";
// import infractoresRoutes from "./routes/infractores";

class App {
  public app: express.Application;
  //public corsOptions: cors.CorsOptions;
  public router: express.Router;

  constructor() {
    this.app = express();
    this.router = express.Router();

    dotenv.config({
      path: path.resolve(__dirname, "../.env"),
    });

    this.initializeRoutes();
    this.initializeDatabase();
  }

  private initializeRoutes() {
    this.app.use(bodyParser.json());
    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        console.log(
          `Received ${req.method} request from ${req.ip} to ${req.originalUrl}`
        );
        next(); // Continue processing the request
      }
    );
    this.app.use("/api/v1/", this.router);
    this.app.use(cors());
  }

  private initializeDatabase() {
    // Initialize database connection
    const conn = getConnection();
    conn
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((error) => {
        console.error("Unable to connect to the database:", error);
      });
  }

  public listen(): void {
    this.app.listen();
  }
}

export default new App().app;

// const app = express();
// app.use(express.json());
// app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));
// app.use(cors());
// const storage = multer.diskStorage({
//   destination: 'uploads/',
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const ext = path.extname(file.originalname); // Obtener la extensión del archivo original
//     const fileName = file.fieldname + '-' + uniqueSuffix + ext; // Concatenar la extensión al nombre del archivo
//     cb(null, fileName);
//   }
// });
// app.use('/files', express.static(path.resolve(__dirname, '../files')));
// app.use(cors());
// const storageFiles = multer.diskStorage({
//   destination: 'files/',
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const ext = path.extname(file.originalname); // Obtener la extensión del archivo original
//     const fileName = file.fieldname + '-' + uniqueSuffix + ext; // Concatenar la extensión al nombre del archivo
//     cb(null, fileName);
//   }
// });

// const uploadFiles = multer ({storage:storageFiles})
// const upload = multer({ storage });
// app.post('/upload-multiple', upload.array('files', 10), (req, res) => {
//   if (!req.files || req.files.length === 0) {
//     return res.status(400).json({ error: 'No files uploaded' });
//   }
//   const filePaths = (req.files as Express.Multer.File[]).map(file => file.path);
//   return res.json({ message: 'Upload success', filePaths: filePaths });
// });
// app.get("/", (_req: Request, res) => {
//   console.log(path.resolve(__dirname, '../uploads'));
//   res.send("cuciba backend");
// });
// app.post('/files', uploadFiles.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No se pudo subir el archivo' });
//   }
//   const filePath = req.file.path;
//   return res.json({ message: 'Upload success', filePath: filePath });
// });
// app.post('/upload', upload.single('file'), (req:Request, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }
//   const filePath = req.file.path
//   return res.json({ message: 'Upload success', filePath: filePath });
// });
// //Enrutado de servicios
// app.use("/servicios", serviciosRoutes);
// app.use("/servicios/preguntas-frecuentes", faqRoutes);
// app.use("/servicios/infractores",infractoresRoutes)
// app.use("/servicios/revista-cucicba", revistaRoutes);
// app.use("/servicios/biblioteca-digital", bibliotecaDigitalRoutes);
// app.use("/servicios/inmobiliarias-penal",inmobiliariasPenalRoutes)
// app.use("/servicios/sanciones",sancionesRouter)
// //Enrutado Institucional
// app.use("/autoridades", autoridadesRoutes);
// app.use("/areas", areasRoutes);
// app.use("/personal", personalRoutes);
// app.use("/tribunal", tribunal_etica_routes);
// app.use("/comision", comisionRevisadoraRoutes);

// //Enrutado de Noticias
// app.use('/noticias',noticiasRoutes);

// (async () => {
//   try {
//     await DbConnection.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// })();
