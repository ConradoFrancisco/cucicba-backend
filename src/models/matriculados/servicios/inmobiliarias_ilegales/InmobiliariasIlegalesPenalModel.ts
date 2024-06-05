import { Op } from 'sequelize';
import { InmobiliariasIlegales } from './InmobiliariasIlegales';
import { sequelize } from '../../../../db/Database';


class InmobiliariasIlegalesPenalModel {
  public async getAll({
    limit,
    offset = 0,
    input = "",
    estado,
    fecha,
    orderBy = "id", // Campo por defecto para ordenar
    orderDirection = "ASC", // Dirección por defecto para ordenar
  }: {
    limit?: number;
    offset?: number;
    input?: string;
    fecha?: string;
    estado?: string;
    orderBy?: string;
    orderDirection?: "ASC" | "DESC";
  }) {
    const where: any = { causa: 1 };
    if (input) {
      where[Op.or] = [
        { nombre: { [Op.like]: `%${input}%` } },
        { direccion: { [Op.like]: `%${input}%` } }
      ];
    }
    if (estado !== undefined) where.estado = estado;

    try {
      const { rows: data, count: total } = await InmobiliariasIlegales.findAndCountAll({
        where,
        limit,
        offset,
        order: [[orderBy, orderDirection]],
        attributes: [
          'id',
          'nombre',
          'direccion',
          [sequelize.fn('DATE_FORMAT', sequelize.col('fecha'), '%d-%m-%Y'), 'fecha'],
          [sequelize.fn('DATE_FORMAT', sequelize.col('fecha'), '%Y-%m-%d'), 'fecha_edit'],
          'estado',
        ],
      });

      return { data, total };
    } catch (e) {
      console.error(e);
      throw new Error("Hubo un error con la db");
    }
  }

  public async getAllNoCausa({
    limit,
    offset = 0,
    input = "",
    estado,
    fecha,
    orderBy = "id", // Campo por defecto para ordenar
    orderDirection = "ASC", // Dirección por defecto para ordenar
  }: {
    limit?: number;
    offset?: number;
    input?: string;
    fecha?: string;
    estado?: string;
    orderBy?: string;
    orderDirection?: "ASC" | "DESC";
  }) {
    const where: any = { causa: 0 };
    if (input) {
      where[Op.or] = [
        { nombre: { [Op.like]: `%${input}%` } },
        { direccion: { [Op.like]: `%${input}%` } }
      ];
    }
    if (estado !== undefined) where.estado = estado;

    try {
      const { rows: data, count: total } = await InmobiliariasIlegales.findAndCountAll({
        where,
        limit,
        offset,
        order: [[orderBy, orderDirection]],
        attributes: [
          'id',
          'nombre',
          'direccion',
          [sequelize.fn('DATE_FORMAT', sequelize.col('fecha'), '%d-%m-%Y'), 'fecha'],
          [sequelize.fn('DATE_FORMAT', sequelize.col('fecha'), '%Y-%m-%d'), 'fecha_edit'],
          'estado',
        ],
      });

      return { data, total };
    } catch (e) {
      console.error(e);
      throw new Error("Hubo un error con la db");
    }
  }

  public async create({
    nombre,
    direccion,
    fecha,
    causa = 1,
  }: {
    nombre: string;
    direccion: string;
    fecha: string;
    causa?: number;
  }) {
    try {
      const result = await InmobiliariasIlegales.create({
        nombre,
        direccion,
        fecha,
        causa,
      });
      return result;
    } catch (e) {
      console.error(e);
      throw new Error("Hubo un error con la db");
    }
  }

  public async setActive({ id, estado }: { id: number; estado: number }) {
    try {
      await InmobiliariasIlegales.update({ estado }, {
        where: { id },
      });
    } catch (e) {
      throw new Error("Error al publicar la inmobiliaria ilegal");
    }
  }

  public async delete({ id }: { id: number }) {
    try {
      await InmobiliariasIlegales.destroy({
        where: { id },
      });
    } catch (e) {
      throw new Error("Error al eliminar la inmobiliaria ilegal");
    }
  }

  public async update({
    id,
    nombre,
    direccion,
    fecha,
    causa ,
  }: {
    id: number;
    nombre?: string;
    direccion?: string;
    fecha?: string;
    causa?: number;
  }) {
    console.log(causa)
    const updateData: any = {};
    if (nombre !== undefined) updateData.nombre = nombre;
    if (direccion !== undefined) updateData.direccion = direccion;
    if (fecha !== undefined) updateData.fecha = fecha;
    if (causa !== undefined || causa === 0) updateData.causa = causa;

    try {
      await InmobiliariasIlegales.update(updateData, {
        where: { id },
      });
    } catch (e) {
      throw new Error("Error al modificar el área");
    }
  }
}

export default new InmobiliariasIlegalesPenalModel();