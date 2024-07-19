import { Request, Response } from "express";
import AutoridadService from "../../services/institucional/AutoridadService";
import { AutoridadDto } from "../../dtos/institucional/AutoridadDto";
import { ActiveParamsDto } from "../../dtos/ActiveParamsDto";
import { DeleteParamsDto } from "../../dtos/DeleteParamsDto";
import { ParamsDto } from "../../dtos/ParamsDto";

export class AutoridadController {
  private static service: AutoridadService = new AutoridadService();

  // GET all authorities
  public async getAll(req: Request, res: Response): Promise<void> {
    const paramsDto: ParamsDto = new ParamsDto(req.query);
    try {
      const result = await AutoridadController.service.getAll(paramsDto);
      res.json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message || "Internal Server Error" });
    }
  }
  public async getCargos(req: Request, res: Response): Promise<void> {
    try {
      const result = await AutoridadController.service.getCargos();
      res.json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e || "Error del servidor" });
    }
  }

  // Create a new authority
  public async create(req: Request, res: Response): Promise<void> {
    const autoridadDto: AutoridadDto = new AutoridadDto(req.body);
    try {
      await AutoridadController.service.createAutoridad(autoridadDto);
      res.status(201).send("Autoridad creada satisfactoriamente!");
    } catch (e) {
      res.status(500).json({ error: e.message || "Internal Server Error" });
      console.error(e);
    }
  }

  // Update an existing authority
  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updateDto = Object.assign({ id }, req.body);
    const autoridadDto = new AutoridadDto(updateDto);
    try {
      await AutoridadController.service.updateAutoridad(autoridadDto);
      res.status(200).send("Autoridad modificada satisfactoriamente!");
    } catch (e) {
      res.status(500).json({ error: e.message || "Internal Server Error" });
      console.error(e);
    }
  }

  // Set authority active/inactive
  public async setActive(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const estado = req.body.estado;
    const activeParams: ActiveParamsDto = new ActiveParamsDto({ id, estado });
    try {
      await AutoridadController.service.setActive(activeParams);
      res
        .status(200)
        .send("Estado de autoridad modificado satisfactoriamente!");
    } catch (e) {
      res.status(500).json({ error: e.message || "Internal Server Error" });
      console.error(e);
    }
  }

  // Delete an authority
  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const body: DeleteParamsDto = new DeleteParamsDto({ id });
    try {
      await AutoridadController.service.delete(body);
      res.status(200).send("Autoridad eliminada satisfactoriamente!");
    } catch (e) {
      res.status(500).json({ error: e.message || "Internal Server Error" });
      console.error(e);
    }
  }
}
