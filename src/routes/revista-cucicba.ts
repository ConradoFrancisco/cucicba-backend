import { Router } from "express";
import RevistaCucicbaController from "../controllers/matriculados/servicios/RevistaCucicbaController";

export const revistaRoutes = Router();

revistaRoutes.get('/',RevistaCucicbaController.getAll);