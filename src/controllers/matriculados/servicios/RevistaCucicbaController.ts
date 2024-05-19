import { Request, Response } from "express";
import RevistaCucicbaModel from "../../../models/matriculados/servicios/RevistaCucicbaModel";

class RevistaCucicbaController {
  async getAll(_req: Request, res: Response): Promise<void> {
    
    try {
      const revistas = await RevistaCucicbaModel.getAll({});
      res.json(revistas);
    } catch (error) {
      console.error("Error al obtener las publicaciones:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
}

export default new RevistaCucicbaController();