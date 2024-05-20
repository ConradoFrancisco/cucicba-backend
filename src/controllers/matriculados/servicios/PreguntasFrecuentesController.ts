import { Request, Response } from "express";
import PreguntasFrecuentesModel from "../../../models/matriculados/servicios/PreguntasFrecuentesModel";

class PreguntasFrecuentesController {
  public async getPreguntas(req: Request, res: Response): Promise<void> {
    let params = {};
    const offset = parseInt(req.query.offset as string);
    const limit = parseInt(req.query.limit as string);
    const category = parseInt(req.query.category as string);
    if (offset) {
      params = Object.assign({ offset }, params);
    }
    if (limit) {
      params = Object.assign({ limit }, params);
    }
    if (category) {
      params = Object.assign({ category }, params);
    }
    console.log(params);
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
}
export default new PreguntasFrecuentesController();
