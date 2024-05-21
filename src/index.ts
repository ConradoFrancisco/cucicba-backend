import express, { Request } from "express";
import autoridadesRoutes from "./routes/autoridades";
import bibliotecaDigitalRoutes from "./routes/biblioteca-digital";
import { revistaRoutes } from "./routes/revista-cucicba";
import { faqRoutes } from "./routes/preguntas-frecuentes";
import { serviciosRoutes } from "./routes/servicios";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (_req: Request, res) => {
  res.send("cuciba backend");
});

//Enrutado de servicios
app.use("/servicios", serviciosRoutes);
app.use("/servicios/preguntas-frecuentes", faqRoutes);
app.use("/servicios/revista-cucicba", revistaRoutes);
app.use("/servicios/biblioteca-digital", bibliotecaDigitalRoutes);
//Enrutado Institucional
app.use("/autoridades", autoridadesRoutes);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
