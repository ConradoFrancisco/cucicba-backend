import Area from './area'; // Asegúrate de ajustar la ruta
import { Op } from 'sequelize';

interface GetAllParams {
  limit?: number;
  offset?: number;
  input?: string;
  estado?: number;
  orden?: number;
  orderBy?: string;
  orderDirection?: "ASC" | "DESC";
}

class AreasModel {
  public async getAll({
    limit,
    offset = 0,
    input,
    estado,
    orden,
    orderBy = 'id',
    orderDirection = 'ASC'
  }: GetAllParams) {
    const where: any = {};
    if (input) {
      where.title = { [Op.like]: `%${input}%` };
    }
    if (estado !== undefined) {
      where.estado = estado;
    }
    if (orden !== undefined) {
      where.orden = orden;
    }
    console.log('hola')
    const { count, rows } = await Area.findAndCountAll({
      where,
      order: [[orderBy, orderDirection]],
      limit,
      offset
    });

    return { data: rows, total: count };
  }

  public async create({ title, orden }: { title: string; orden: number }) {
    return await Area.create({ title, orden });
  }

  public async setActive({ id, estado }: { id: number; estado: number }) {
    return await Area.update({ estado }, { where: { id } });
  }

  public async update({ id, title, orden }: { id: number; title: string; orden: number }) {
    return await Area.update({ title, orden }, { where: { id } });
  }

  public async delete({ id }: { id: number }) {
    return await Area.destroy({ where: { id } });
  }

  public async getAreasNames() {
    return await Area.findAll({
      attributes: ['id', 'title']
    });
  }
}

export default new AreasModel();