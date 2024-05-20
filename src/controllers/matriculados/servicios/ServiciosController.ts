import { Request, Response } from "express";
import ServiciosModel from "../../../models/matriculados/servicios/ServiciosModel";

class ServiciosController {
  public async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const servicios = await ServiciosModel.getAll();
      res.json(servicios);
    } catch (error) {
      console.error("Error al obtener los servicios:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
}

export default new ServiciosController();
