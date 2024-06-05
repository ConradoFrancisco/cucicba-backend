import { Op } from 'sequelize';
import { ComisionRevisadora } from './institucional/comision_revisadora/comisionRevisadora';


class ComisionRevisadoraModel {
  public async getAll({
    limit,
    offset = 0,
    input = "",
    estado,
    posicion,
    orden,
    orderBy = "nombre", // Campo por defecto para ordenar
    orderDirection = "DESC", // Dirección por defecto para ordenar
  }: {
    limit?: number;
    offset?: number;
    input?: string;
    estado?: string;
    orden?: number;
    posicion?: string;
    orderBy?: string;
    orderDirection?: "ASC" | "DESC";
  }) {
    const where: any = {};
    if (input) {
      where[Op.or] = [
        { nombre: { [Op.like]: `%${input}%` } },
        { apellido: { [Op.like]: `%${input}%` } }
      ];
    }
    if (estado !== undefined) where.estado = estado;
    if (posicion) where.posicion = posicion;
    if (orden !== undefined) where.orden = orden;

    try {
      const { rows: data, count: total } = await ComisionRevisadora.findAndCountAll({
        where,
        limit,
        offset,
        order: [[orderBy, orderDirection]],
      });

      return { data, total };
    } catch (e) {
      console.error(e);
      throw new Error("Error en la db al conseguir los datos de la comisión revisadora");
    }
  }

  public async create({
    nombre,
    apellido,
    orden,
    posicion,
  }: {
    nombre: string;
    apellido: string;
    orden: number;
    posicion: string;
  }) {
    try {
      const result = await ComisionRevisadora.create({
        nombre,
        apellido,
        orden,
        posicion,
        estado: 1 // Asumiendo que el estado por defecto es activo
      });
      return result;
    } catch (e) {
      console.error(e);
      throw new Error("Hubo un error con la db");
    }
  }

  public async setActive({ id, estado }: { id: number; estado: number }) {
    try {
      await ComisionRevisadora.update({ estado }, {
        where: { id }
      });
    } catch (e) {
      throw new Error("Error al activar la autoridad");
    }
  }

  public async delete({ id }: { id: number }) {
    try {
      await ComisionRevisadora.destroy({
        where: { id }
      });
    } catch (e) {
      throw new Error("Error al eliminar la autoridad");
    }
  }

  public async update({
    id,
    nombre,
    apellido,
    orden,
    posicion
  }: {
    id: number;
    nombre?: string;
    apellido?: string;
    orden?: number;
    posicion?: string;
  }) {
    const updateData: any = {};
    if (nombre !== undefined) updateData.nombre = nombre;
    if (apellido !== undefined) updateData.apellido = apellido;
    if (orden !== undefined) updateData.orden = orden;
    if (posicion !== undefined) updateData.posicion = posicion;

    try {
      await ComisionRevisadora.update(updateData, {
        where: { id }
      });
    } catch (e) {
      throw new Error("Error al modificar el área");
    }
  }
}

export default new ComisionRevisadoraModel();