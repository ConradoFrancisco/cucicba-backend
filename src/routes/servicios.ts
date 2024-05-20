import { Router } from "express";
import ServiciosController from "../controllers/matriculados/servicios/ServiciosController";

export const serviciosRoutes = Router();

serviciosRoutes.get("/", ServiciosController.getAll);
