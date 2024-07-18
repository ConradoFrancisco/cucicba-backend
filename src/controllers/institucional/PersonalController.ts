import { Request, Response } from "express";
import PersonalService from "../../services/institucional/PersonalService";
import { ParamsDto } from "../../dtos/ParamsDto";
import { PersonalDto } from "../../dtos/institucional/PersonalDto";
import { ActiveParamsDto } from "../../dtos/ActiveParamsDto";
import { DeleteParamsDto } from "../../dtos/DeleteParamsDto";

export class PersonalController {
  private static service: PersonalService = new PersonalService();

  //GET
  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const paramsDto: ParamsDto = new ParamsDto(req.query);
      const result = await PersonalController.service.getAll(paramsDto);
      res.json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
    }
  }

  public async getByAreas(req: Request, res: Response): Promise<void> {
    try {
      const result = await PersonalController.service.getPersonalByArea();
      res.json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
    }
  }
  public async create(req: Request, res: Response) {
    const personalDto: PersonalDto = new PersonalDto(req.body);
    try {
      await PersonalController.service.createPersonal(personalDto);
      res.status(201).send("Registro creado satisfactoriamente!");
    } catch (e: any) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(e);
    }
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const updateDto = Object.assign({ id }, req.body);
    const personalDto = new PersonalDto(updateDto);
    try {
      await PersonalController.service.updatePersonal(personalDto);
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
      await PersonalController.service.setActive(activeParams);
      res.status(201).send("Personal modificado satisfactoriamente!");
    } catch (e: any) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(e);
    }
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const body: DeleteParamsDto = new DeleteParamsDto({ id });
    try {
      await PersonalController.service.delete(body);
      res.status(201).send("Registro eliminado satisfactoriamente!");
    } catch (e: any) {
      res.status(500).json({ error: "Internal Server Error" });
      console.error(e);
    }
  }
}
