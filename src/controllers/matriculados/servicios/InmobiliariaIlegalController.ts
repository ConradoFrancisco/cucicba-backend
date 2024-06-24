import { Request, Response } from "express";
import * as yup from "yup";
import InmobiliariasIlegalesPenalModel from "../../../models/matriculados/servicios/inmobiliarias_ilegales/InmobiliariasIlegalesPenalModel";
import { ParamsDto } from "../../../dtos/ParamsDto";
import { InmobiliariaIlegalService } from "../../../services/servicios/InmobiliariaIlegalService";
import { InmobiliariaIlegalDto } from "../../../dtos/servicios/InmobiliariaIlegal";
import { ActiveParamsDto } from "../../../dtos/ActiveParamsDto";
import { DeleteParamsDto } from "../../../dtos/DeleteParamsDto";

export class InmobiliariaIlegalController {
  public static service: InmobiliariaIlegalService =
    new InmobiliariaIlegalService();

  public async getAll(req: Request, res: Response) {
    const paramsDto: ParamsDto = new ParamsDto(req.body);
    try {
      const result = await InmobiliariaIlegalController.service.getAll(
        paramsDto
      );
      res.json(result);
    } catch (e) {
      console.error("error al obtener las inmobiliarias Ilegales", e);
      res.status(500).send(e);
    }
  }
  public async create(req: Request, res: Response) {
    const inmobiliariaIlegalDto: InmobiliariaIlegalDto =
      new InmobiliariaIlegalDto(req.body);
    try {
      await InmobiliariaIlegalController.service.createInmobiliariaIlegal(
        inmobiliariaIlegalDto
      );
      res.status(201).send("Registro creado satisfactoriamente!");
    } catch (e: any) {
      res.status(500).json({ error: e });
    }
  }
  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { nombre, direccion, fecha } = req.body;
    const inmobiliariaIlegalDto: InmobiliariaIlegalDto =
      new InmobiliariaIlegalDto({
        id,
        nombre,
        direccion,
        fecha,
      });
    await InmobiliariaIlegalController.service.updateInmobiliariaIlegal(
      inmobiliariaIlegalDto
    );
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
      await InmobiliariaIlegalController.service.setActive(activeParams);
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
      await InmobiliariaIlegalController.service.delete(body);
      res.status(201).send("Registro eliminado satisfactoriamente!");
    } catch (e: any) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(e);
    }
  }
}
