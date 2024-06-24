import { Request, Response } from "express";
import { ParamsDto } from "../../../dtos/ParamsDto";
import InfractorService from "../../../services/servicios/InfractorService";
import { InfractorDto } from "../../../dtos/servicios/InfractorDto";
import { ActiveParamsDto } from "../../../dtos/ActiveParamsDto";
import { DeleteParamsDto } from "../../../dtos/DeleteParamsDto";

export class InfractorController {
  private static service: InfractorService = new InfractorService();

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const paramsDto: ParamsDto = new ParamsDto(req.query);
      const result = await InfractorController.service.getAll(paramsDto);
      res.json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
    }
  }
  public async create(req: Request, res: Response) {
    const infractorDto: InfractorDto = new InfractorDto(req.body);
    try {
      await InfractorController.service.createInfractor(infractorDto);
      res.status(201).send("Registro creado satisfactoriamente!");
    } catch (e: any) {
      res.status(500).json({ error: e });
    }
  }
  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { nombre, direccion, fecha } = req.body;
    const infractorDto: InfractorDto = new InfractorDto({
      id,
      nombre,
      direccion,
      fecha,
    });
    await InfractorController.service.updateInfractor(infractorDto);
    try {
      res.status(201).send("Registro Modificado correctamente!");
    } catch (e: any) {
      res.status(500).json({ error: e });
    }
  }
  public async setActive(req: Request, res: Response) {
    const { id } = req.params;
    const estado = req.body.estado;
    const activeParams: ActiveParamsDto = new ActiveParamsDto({ id, estado });
    try {
      await InfractorController.service.setActive(activeParams);
      res.status(201).send("Infractor modificado correctamente!");
    } catch (e: any) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(e);
    }
  }
  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deletedAt: Date = new Date();
    const body: DeleteParamsDto = new DeleteParamsDto({ id, deletedAt });
    try {
      await InfractorController.service.delete(body);
      res.status(201).send("Registro eliminado satisfactoriamente!");
    } catch (e: any) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(e);
    }
  }
}
