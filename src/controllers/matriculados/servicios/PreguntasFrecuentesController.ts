import { Request, Response } from "express";
import PreguntasFrecuentesModel from "../../../models/matriculados/servicios/PreguntasFrecuentesModel";

class PreguntasFrecuentesController {
  public async getPreguntas(req: Request, res: Response): Promise<void> {
    let params = {};
    const offset = parseInt(req.query.offset as string);
    const limit = parseInt(req.query.limit as string);
    const category = parseInt(req.query.category as string);
    const input = req.query.input as string;
    if (input) {
      params = Object.assign({ input }, params);
    }
    if (category) {
      params = Object.assign({ category }, params);
    }
    if (offset) {
      params = Object.assign({ offset }, params);
    }
    if (limit) {
      params = Object.assign({ limit }, params);
    }
    
    try {
      const results = await PreguntasFrecuentesModel.getPreguntas(params);
      res.json(results);
    } catch (error) {
      console.error("Error al obtener las preguntas frecuentes:", error);
      res.status(500).send("error interno del servidor");
    }
  }
  public async getCategorys(req: Request, res: Response) {
    try {
      const results = await PreguntasFrecuentesModel.getCategorys();
      res.json(results);
    } catch (e) {
      console.error("Error al obtener las categorias, intentelo mas tarde");
      res.status(500).send("arror intero del servidor");
    }
  }
  public async create(req: Request, res: Response) {
    const {pregunta,respuesta} = req.body
    const categoria = parseInt(req.body.categoria)
    try {
      await PreguntasFrecuentesModel.create({pregunta,respuesta,categoria});
      res.status(201).send("Registro creado satisfactoriamente!");
    } catch (e: any) {
      // Si hay un error de validación o cualquier otro error, enviar una respuesta de error
      if (e.name === "ValidationError") {
        res.status(400).json({ error: e.errors });
      } else {
        res.status(500).json({ error: "Error del servidor" });
      }
      console.error(e);
    }
  }
}
export default new PreguntasFrecuentesController();
