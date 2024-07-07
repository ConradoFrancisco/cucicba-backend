import { Request, Response } from "express";
import { PreguntaFrecuenteService } from "../../../services/servicios/PreguntaFrecuenteService";
import { ParamsDto } from "../../../dtos/ParamsDto";
import { PreguntaFrecuenteDto } from "../../../dtos/servicios/PreguntaFrecuenteDto";
import { ActiveParamsDto } from "../../../dtos/ActiveParamsDto";
import { DeleteParamsDto } from "../../../dtos/DeleteParamsDto";
import { SancionService } from "../../../services/servicios/SancionService";
import { SancionDto } from "../../../dtos/servicios/SancionDto";
import RevistaService from "../../../services/servicios/RevistaService";
import { RevistaDto } from "../../../dtos/servicios/RevistaDto";

export class RevistaController {
  private static service: RevistaService = new RevistaService();

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const paramsDto: ParamsDto = new ParamsDto(req.query);
      const result = await RevistaController.service.getAll(paramsDto);
      res.json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
    }
  }
  public async create(req: Request, res: Response) {
    const Revista: RevistaDto = new RevistaDto(req.body);
    try {
      await RevistaController.service.create(Revista);
      res.status(201).send("Registro creado satisfactoriamente!");
    } catch (e: any) {
      res.status(500).json({ error: e });
    }
  }
  public async setState(req: Request, res: Response) {
    const { id } = req.params;
    const { estado } = req.body;
    const activeParams: ActiveParamsDto = new ActiveParamsDto({ id, estado });
    try {
      await RevistaController.service.setState(activeParams);
      res.status(200).send("Sanción dada de alta!");
    } catch (e: any) {
      res.status(500).json({ error: e });
      console.error(e);
    }
  }
  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleteParamsDto: DeleteParamsDto = new DeleteParamsDto({ id });
    try {
      const result = await RevistaController.service.delete(deleteParamsDto);
      res.status(200).send("Sanción eliminada satisfactoriamente!");
      return res.json(result);
    } catch (e: any) {
      res.status(500).json({ error: e });
    }
  }
  public async update(req: Request, res: Response) {
    const { id } = req.query;
    const updateDto = Object.assign({ id }, req.body);
    const revistaDto: RevistaDto = new RevistaDto(updateDto);
    try {
      await RevistaController.service.update(revistaDto);
    } catch (e: any) {
      res.status(500).json({ error: e });
    }
  }
}
