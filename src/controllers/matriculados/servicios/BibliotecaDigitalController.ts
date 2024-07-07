import { Request, Response } from "express";
import { BibliotecaDigitalService } from "../../../services/servicios/BibliotecaDigitalService";
import { ParamsDto } from "../../../dtos/ParamsDto";
import { ActiveParamsDto } from "../../../dtos/ActiveParamsDto";
import { DeleteParamsDto } from "../../../dtos/DeleteParamsDto";
import { PostDto } from "../../../dtos/servicios/PostDto";

export class BibliotecaDigitalController {
  private static service: BibliotecaDigitalService =
    new BibliotecaDigitalService();

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const paramsDto: ParamsDto = new ParamsDto(req.query);
      const result = await BibliotecaDigitalController.service.getAll(
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
        await BibliotecaDigitalController.service.getAllCategorias();
      res.json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
    }
  }
  public async create(req: Request, res: Response) {
    const PreguntaFrecuente: PostDto = new PostDto(req.body);
    try {
      await BibliotecaDigitalController.service.create(PreguntaFrecuente);
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
      await BibliotecaDigitalController.service.setState(activeParams);
      res.status(200).send("Post cambiado de estado!");
    } catch (e: any) {
      res.status(500).json({ error: e });
      console.error(e);
    }
  }
  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleteParamsDto: DeleteParamsDto = new DeleteParamsDto({ id });
    try {
      const result = await BibliotecaDigitalController.service.delete(
        deleteParamsDto
      );
      res.status(200).send("Pregunta eliminada satisfactoriamente!");
      return res.json(result);
    } catch (e: any) {
      res.status(500).json({ error: "Error del servidor" });
    }
  }
  public async update(req: Request, res: Response) {
    const { id } = req.query;
    const updateDto = Object.assign({ id }, req.body);
    const preguntasFrecuentesDto: PostDto = new PostDto(updateDto);
    try {
      await BibliotecaDigitalController.service.update(preguntasFrecuentesDto);
    } catch (e: any) {
      res.status(500).json({ error: "Error del servidor" });
    }
  }
}
