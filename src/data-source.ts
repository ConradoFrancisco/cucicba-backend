import "reflect-metadata";
import * as dotenv from "dotenv";
import * as path from "path";
import { DataSource } from "typeorm";
import { AutoridadEtica } from "./entity/AutoridadEtica";

import { Cargo } from "./entity/Cargo";
import { Periodo } from "./entity/Periodo";

import { RepresentanteAsambleario } from "./entity/RepresentanteAsambleario";

import { Ilegal } from "./entity/Ilegal";
import { Infractor } from "./entity/Infractor";
import { PostBiblioteca } from "./entity/PostBiblioteca";
import { PreguntaFrecuente } from "./entity/PreguntaFrecuente";
import { Revista } from "./entity/Revista";
import { Sancion } from "./entity/Sancion";
import { Area } from "./entity/Area";
import { ImagenNoticia } from "./entity/ImagenNoticia";
import { Noticia } from "./entity/Noticia";
import { Servicio } from "./entity/Servicio";
import { AutoridadPrincipal } from "./entity/AutoridadPrincipal";
import { AutoridadRevisora } from "./entity/AutoridadRevisadora";
import { Persona } from "./entity/Persona";
import { Personal } from "./entity/Personal";
import { CategoriaPost } from "./entity/CategoriaPost";
import { CategoriaSancion } from "./entity/CategoriaSancion";
import { CategoriasPreguntasFrecuentes } from "./entity/CategoriasPreguntasFrecuentes";

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
