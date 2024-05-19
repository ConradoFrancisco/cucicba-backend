import { Router } from "express";
import PreguntasFrecuentesController from "../controllers/matriculados/servicios/PreguntasFrecuentesController";

export const faqRoutes = Router();

faqRoutes.get('/',PreguntasFrecuentesController.getPreguntas)