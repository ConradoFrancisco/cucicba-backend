import {Router } from "express";
import BibliotecaDigitalController from "../controllers/matriculados/servicios/BibliotecaDigitalController";

const bibliotecaDigitalRoutes = Router();

bibliotecaDigitalRoutes.get("/", BibliotecaDigitalController.getAll);
bibliotecaDigitalRoutes.post("/", BibliotecaDigitalController.create);
bibliotecaDigitalRoutes.delete("/:id", BibliotecaDigitalController.delete);
bibliotecaDigitalRoutes.patch("/:id", BibliotecaDigitalController.setActive);
bibliotecaDigitalRoutes.patch("/modificar/:id", BibliotecaDigitalController.update);
bibliotecaDigitalRoutes.get("/categorias",BibliotecaDigitalController.getAllCategories);

export default bibliotecaDigitalRoutes;
