import AutoridadPeriodoService from "../../services/institucional/PeriodoService";
import { Request, Response } from "express";

export class PeriodoController {
  private static service: AutoridadPeriodoService =
    new AutoridadPeriodoService();

  // GET all authorities
  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const result = await PeriodoController.service.getAll();
      res.json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message || "Internal Server Error" });
    }
  }
  public async getOneByDate(req: Request, res: Response): Promise<void> {
    try {
      const result = await PeriodoController.service.getCurrentPeriodo();
      res.json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message || "Internal Server Error" });
    }
  }
}
