import { Request, Response } from "express";
import RevistaCucicbaModel from "../../../models/matriculados/servicios/RevistaCucicbaModel";

class RevistaCucicbaController {
  async getAll(_req: Request, res: Response): Promise<void> {
    const offset = parseInt(_req.query.offset as string);
    const limit = parseInt(_req.query.limit as string);
    try {
      const revistas = await RevistaCucicbaModel.getAll({ offset, limit });
      res.json(revistas);
    } catch (error) {
      console.error("Error al obtener las publicaciones:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
}

export default new RevistaCucicbaController();
