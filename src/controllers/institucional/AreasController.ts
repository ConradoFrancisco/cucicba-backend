import { Request, Response } from "express";
import * as yup from "yup";
import AreasModel from "../../models/institucional/AreasModel";
const areaSchema = yup.object().shape({
  title: yup.string().required(),
  order: yup.number().required().integer().positive(),
});
class AreasController {
  public async getAll(req: Request, res: Response) {
    try {
      const results = await AreasModel.getAll();
      res.json(results);
    } catch (e) {
      console.error("error al obtener las areas", e);
      res.status(500).send("error en el servidor");
    }
  }
  public async create(req: Request, res: Response) {
    const { title, order } = req.body;
    try {
      const validation = await areaSchema.isValid({ title, order });

      if (validation) {
        await AreasModel.create({ order, title });
        res.status(201).send("Registro creado satisfactoriamente!");
      }
    } catch (e) {
      res.status(422);
      console.error(e);
    }

    //console.log("aca busco: ", areaSchema.isValid(title, order));
  }
}
export default new AreasController();
