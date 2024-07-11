import { Request, Response } from "express";
import { PreguntaFrecuenteService } from "../../../services/servicios/PreguntaFrecuenteService";
import { ParamsDto } from "../../../dtos/ParamsDto";
import { PreguntaFrecuenteDto } from "../../../dtos/servicios/PreguntaFrecuenteDto";
import { ActiveParamsDto } from "../../../dtos/ActiveParamsDto";
import { DeleteParamsDto } from "../../../dtos/DeleteParamsDto";

export class PreguntasFrecuentesController {
  private static service: PreguntaFrecuenteService =
    new PreguntaFrecuenteService();

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      console.log("controller query:", req.query);
      const paramsDto: ParamsDto = new ParamsDto(req.query);
      const result = await PreguntasFrecuentesController.service.getAll(
        paramsDto
      );
      res.json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
    }
  }
  public async getAllCategorias(req: Request, res: Response): Promise<void> {
    try {
      const result =
        await PreguntasFrecuentesController.service.getAllCategorias();
      res.json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
    }
  }
  public async create(req: Request, res: Response) {
    const PreguntaFrecuente: PreguntaFrecuenteDto = new PreguntaFrecuenteDto(
      req.body
    );
    try {
      await PreguntasFrecuentesController.service.create(PreguntaFrecuente);
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
      await PreguntasFrecuentesController.service.setState(activeParams);
      res.status(200).send("Pregunta Frecuente Publicada dada de alta!");
    } catch (e: any) {
      res.status(500).json({ error: e });
      console.error(e);
    }
  }
  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleteParamsDto: DeleteParamsDto = new DeleteParamsDto({ id });
    try {
      await PreguntasFrecuentesController.service.delete(deleteParamsDto);
      res.status(200).send("Pregunta eliminada satisfactoriamente!");
    } catch (e: any) {
      res.status(500).json({ error: "Error del servidor" });
    }
  }
  public async update(req: Request, res: Response) {
    const { id } = req.query;
    const updateDto = Object.assign({ id }, req.body);
    const preguntasFrecuentesDto: PreguntaFrecuenteDto =
      new PreguntaFrecuenteDto(updateDto);
    try {
      await PreguntasFrecuentesController.service.update(
        preguntasFrecuentesDto
      );
      res.status(200).send("Pregunta editada satisfactoriamente!");
    } catch (e: any) {
      res.status(500).json({ error: "Error del servidor" });
    }
  }
}
