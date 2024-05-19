import {Router } from "express";
import BibliotecaDigitalController from "../controllers/matriculados/servicios/BibliotecaDigitalController";

const bibliotecaDigitalRoutes = Router();

bibliotecaDigitalRoutes.get("/", BibliotecaDigitalController.getAll);

export default bibliotecaDigitalRoutes;
