import { Router } from "express";
import RevistaCucicbaController from "../controllers/matriculados/servicios/RevistaCucicbaController";

export const revistaRoutes = Router();

revistaRoutes.get("/", RevistaCucicbaController.getAll);
revistaRoutes.post("/", RevistaCucicbaController.create);
revistaRoutes.patch("/:id", RevistaCucicbaController.setActive);
revistaRoutes.delete("/:id", RevistaCucicbaController.delete);
revistaRoutes.patch("/modificar/:id", RevistaCucicbaController.update);
