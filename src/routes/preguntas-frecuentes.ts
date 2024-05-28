import { Router } from "express";
import PreguntasFrecuentesController from "../controllers/matriculados/servicios/PreguntasFrecuentesController";

export const faqRoutes = Router();

faqRoutes.get("/", PreguntasFrecuentesController.getPreguntas);
faqRoutes.patch("/:id", PreguntasFrecuentesController.setActive);
faqRoutes.patch("/modificar/:id", PreguntasFrecuentesController.update);
faqRoutes.get("/categorias", PreguntasFrecuentesController.getCategorys);
faqRoutes.post("/", PreguntasFrecuentesController.create);
faqRoutes.delete("/:id", PreguntasFrecuentesController.delete);
