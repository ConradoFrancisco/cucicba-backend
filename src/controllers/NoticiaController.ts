import { Request, Response } from "express";
import { NoticiaService } from "../services/NoticiaService";
import { ParamsDto } from "../dtos/ParamsDto";
import { NoticiaDto } from "../dtos/NoticiaDto";
import { ActiveParamsDto } from "../dtos/ActiveParamsDto";
import { DeleteParamsDto } from "../dtos/DeleteParamsDto";

export class NoticiaController {
  private static service: NoticiaService = new NoticiaService();

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const paramsDto: ParamsDto = new ParamsDto(req.query);
      const result = await NoticiaController.service.getAll(paramsDto);
      res.json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
    }
  }

  public async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    console.log("entre");
    try {
      const noticia = await NoticiaController.service.getByid(id);
      res.json(noticia);
    } catch (e: any) {
      res.status(500).json({ error: e });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      await NoticiaController.service.create(req.body.titulo);
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
      await NoticiaController.service.setState(activeParams);
      res.status(200).send("Noticia cambiada de estado!");
    } catch (e: any) {
      res.status(500).json({ error: e });
      console.error(e);
    }
  }
  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleteParamsDto: DeleteParamsDto = new DeleteParamsDto({ id });
    try {
      const result = await NoticiaController.service.delete(deleteParamsDto);
      res.status(200).send("Pregunta eliminada satisfactoriamente!");
    } catch (e: any) {
      res.status(500).json({ error: "Error del servidor" });
    }
  }
  public async update(req: Request, res: Response) {
    const { id } = req.query;
    const updateDto = Object.assign({ id }, req.body);
    const postDto: NoticiaDto = new NoticiaDto(updateDto);
    try {
      await NoticiaController.service.update(postDto);
      res.status(200).send("Post modificado correctamente");
    } catch (e: any) {
      res.status(500).json({ error: "Error del servidor" });
    }
  }
}
