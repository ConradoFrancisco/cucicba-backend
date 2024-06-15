import { Request, Response } from "express";
import { ServicioService } from "../services/ServicioService";

export class ServiciosController {

  private static service: ServicioService = new ServicioService();

  public async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const servicios = await ServiciosController.service.getAll();
      res.json(servicios);
    } catch (error) {
      console.error("Error al obtener los servicios:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
}