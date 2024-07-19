import { Request, Response } from "express";
import { ActiveParamsDto } from "../../dtos/ActiveParamsDto";
import { DeleteParamsDto } from "../../dtos/DeleteParamsDto";
import { ParamsDto } from "../../dtos/ParamsDto";
import { EticaDto } from "../../dtos/institucional/EticaDto";
import AutoridadRevisoraService from "../../services/institucional/AutoridadRevisoraService";

export class AutoridadRevisoraController {
  private static service: AutoridadRevisoraService =
    new AutoridadRevisoraService();

  // GET all authorities
  public async getAll(req: Request, res: Response): Promise<void> {
    const paramsDto: ParamsDto = new ParamsDto(req.query);
    try {
      const result = await AutoridadRevisoraController.service.getAll(
        paramsDto
      );
      res.json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message || "Internal Server Error" });
    }
  }

  // Create a new authority
  public async create(req: Request, res: Response): Promise<void> {
    const autoridadDto: EticaDto = new EticaDto(req.body);
    try {
      await AutoridadRevisoraController.service.createAutoridad(autoridadDto);
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
    const autoridadDto = new EticaDto(updateDto);
    try {
      await AutoridadRevisoraController.service.updateAutoridad(autoridadDto);
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
      await AutoridadRevisoraController.service.setActive(activeParams);
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
      await AutoridadRevisoraController.service.delete(body);
      res.status(200).send("Autoridad eliminada satisfactoriamente!");
    } catch (e) {
      res.status(500).json({ error: e.message || "Internal Server Error" });
      console.error(e);
    }
  }
}
