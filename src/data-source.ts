import "reflect-metadata";
import * as dotenv from "dotenv";
import * as path from "path";
import { DataSource } from "typeorm";
import { AutoridadEtica } from "./entity/institucional/AutoridadEtica";
import { AutoridadPrincipal } from "./entity/institucional/AutoridadPrincipal";
import { AutoridadRevisora } from "./entity/institucional/AutoridadRevisadora";
import { Cargo } from "./entity/institucional/Cargo";
import { Periodo } from "./entity/institucional/Periodo";
import { Persona } from "./entity/institucional/Persona";
import { Personal } from "./entity/institucional/Personal";
import { RepresentanteAsambleario } from "./entity/institucional/RepresentanteAsambleario";
import { CategoriaPost } from "./entity/servicios/CategoriaPost";
import { CategoriaSancion } from "./entity/servicios/CategoriaSancion";
import { CategoriasPreguntasFrecuentes } from "./entity/servicios/CategoriasPreguntasFrecuentes";
import { Ilegal } from "./entity/servicios/Ilegal";
import { Infractor } from "./entity/servicios/Infractor";
import { PostBiblioteca } from "./entity/servicios/PostBiblioteca";
import { PreguntaFrecuente } from "./entity/servicios/PreguntaFrecuente";
import { Revista } from "./entity/servicios/Revista";
import { Sancion } from "./entity/servicios/Sancion";
import { Area } from "./entity/Area";
import { ImagenNoticia } from "./entity/ImagenNoticia";
import { Noticia } from "./entity/Noticia";
import { Servicio } from "./entity/Servicio";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

export const AppDataSource: DataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER || "postgresql",
  password: process.env.DB_PASS || "root",
  database: process.env.DB_NAME || "test",
  synchronize: true,
  logging: true,
  entities: [
    AutoridadEtica,
    AutoridadPrincipal,
    AutoridadRevisora,
    Cargo,
    Periodo,
    Persona,
    Personal,
    RepresentanteAsambleario,
    CategoriaPost,
    CategoriaSancion,
    CategoriasPreguntasFrecuentes,
    Ilegal,
    Infractor,
    PostBiblioteca,
    PreguntaFrecuente,
    Revista,
    Sancion,
    Area,
    ImagenNoticia,
    Noticia,
    Servicio,
  ],
});

const getDataSource = () => {
  return process.env.NODE_ENV === "test" ? AppDataSource : AppDataSource;
};

export { getDataSource };
