import Autoridad, { IAutoridadAttributes } from "./Autoridad";
import {AutoridadTipo} from "./AutoridadTipo";
import { Op } from "sequelize";

interface GetAllParams {
  limit?: number;
  offset?: number;
  input?: string;
  estado?: string;
  orden?: number;
  puesto_id?: number;
  orderBy?: string;
  orderDirection?: "ASC" | "DESC";
}

class AutoridadesModel {
  async getAll({
    limit,
    offset,
    input,
    estado,
    orden,
    puesto_id,
    orderBy = "orden",
    orderDirection = "DESC",
  }: GetAllParams) {
    const where: any = {};
    if (input) {
      where[Op.or] = [
        { nombre: { [Op.like]: `%${input}%` } },
        { apellido: { [Op.like]: `%${input}%` } },
      ];
    }
    if (estado !== undefined || estado === 0) {
      where.estado = estado;
    }
    if (puesto_id !== undefined) {
      where.puesto_id = puesto_id;
    }
    if (orden !== undefined) {
      where.orden = orden;
    }

    const { count, rows } = await Autoridad.findAndCountAll({
      where,
      include: [
        {
          model: AutoridadTipo,
          attributes: ["nombre"],
        },
      ],
      order: [[orderBy, orderDirection]],
      limit,
      offset,
      raw: true,
    });
    
    const modRows = rows.map((row: any) => {
      const modifiedRow = { ...row, puesto: row['AutoridadPuesto.nombre'] };
      delete modifiedRow['AutoridadPuesto.nombre'];
      return modifiedRow;
    });

    return { data: modRows, total: count };
  }

  async getCargos() {
    return await AutoridadTipo.findAll();
  }

  async create(autoridad: IAutoridadAttributes) {
    console.log("aca",autoridad)
    return await Autoridad.create({
      ...autoridad,
      nombre: autoridad.nombre.toUpperCase().trim(),
      apellido: autoridad.apellido.toUpperCase().trim(),
    });
  }

  async setActive({ id, estado }: { id: number; estado: number }) {
    return await Autoridad.update({ estado }, { where: { id } });
  }

  async delete({ id }: { id: number }) {
    return await Autoridad.destroy({ where: { id } });
  }

  async update({
    id,
    nombre,
    apellido,
    avatar,
    puesto_id,
    orden,
  }: {
    id: number;
    nombre?: string;
    apellido?: string;
    avatar?: string;
    puesto_id?: number;
    orden?: number;
  }) {
    const fieldsToUpdate: any = {};
    if (nombre !== undefined) fieldsToUpdate.nombre = nombre;
    if (apellido !== undefined) fieldsToUpdate.apellido = apellido;
    if (avatar !== undefined) fieldsToUpdate.avatar = avatar;
    if (puesto_id !== undefined) fieldsToUpdate.puesto_id = puesto_id;
    if (orden !== undefined) fieldsToUpdate.orden = orden;

    return await Autoridad.update(fieldsToUpdate, { where: { id } });
  }
}

export default new AutoridadesModel();
