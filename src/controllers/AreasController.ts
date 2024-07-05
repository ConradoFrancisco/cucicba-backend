import { Request, Response } from "express";
import AreaService from "../services/AreaService";
import { ParamsDto } from "../dtos/ParamsDto";
import { AreaDto } from "../dtos/AreaDto";
import { DeleteParamsDto } from "../dtos/DeleteParamsDto";
import { ActiveParamsDto } from "../dtos/ActiveParamsDto";

export class AreasController {
  private static service: AreaService = new AreaService();

  //GET
  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const paramsDto: ParamsDto = new ParamsDto(req.query);
      const result = await AreasController.service.getAll(paramsDto);
      res.json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
    }
  }
  public async create(req: Request, res: Response) {
    const areaDto: AreaDto = req.body;
    try {
      await AreasController.service.createArea(areaDto);
      res.status(201).send("Registro creado satisfactoriamente!");
    } catch (e: any) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(e);
    }
  }

  public async update(req: Request, res: Response) {
    const { nombre, descripcion, orden } = req.body;
    const id = req.params.id;
    const areaDto: AreaDto = new AreaDto({ nombre, descripcion, orden, id });
    try {
      await AreasController.service.updateArea(areaDto);
      res.status(201).send("Registro modificado satisfactoriamente!");
    } catch (e: any) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(e);
    }
  }
  public async setActive(req: Request, res: Response) {
    const { id } = req.params;
    const estado = req.body.estado;
    const activeParams: ActiveParamsDto = new ActiveParamsDto({ id, estado });
    try {
      await AreasController.service.setActive(activeParams);
      res.status(201).send("Area modificada satisfactoriamente!");
    } catch (e: any) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(e);
    }
  }
  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const body: DeleteParamsDto = new DeleteParamsDto({ id });
    try {
      await AreasController.service.delete(body);
      res.status(201).send("Registro eliminado satisfactoriamente!");
    } catch (e: any) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(e);
    }
  }
}
