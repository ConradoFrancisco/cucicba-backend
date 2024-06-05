import { Op } from 'sequelize';
import Infractor from './Infractor';

class InfractoresModel {
  public async getAll({
    limit,
    offset = 0,
    estado,
    input,
    orderBy = 'id',
    orderDirection = 'ASC',
  }: {
    estado?: number;
    limit?: number;
    offset?: number;
    input?: string;
    orderBy?: string;
    orderDirection?: 'ASC' | 'DESC';
  }) {
    const where: any = {};
    if (input) {
      where.nombre = { [Op.like]: `%${input}%` };
    }
    if (estado !== undefined) where.estado = estado;

    try {
      const { rows: data, count: total } = await Infractor.findAndCountAll({
        where,
        limit,
        offset,
        order: [[orderBy, orderDirection]],
        attributes: ['id', 'nombre', 'direccion', 'fecha', 'estado'],
      });
      return { data, total };
    } catch (e) {
      console.error(e);
      throw new Error('Hubo un error con la db');
    }
  }

  public async create({
    nombre,
    direccion,
    fecha,
  }: {
    nombre: string;
    direccion: string;
    fecha: string;
  }) {
    try {
      const result = await Infractor.create({
        nombre,
        direccion,
        fecha: new Date(fecha),
      });
      return result;
    } catch (e) {
      console.error('Error en la db al ingresar el infractor: ', e);
      throw new Error('Error en la db al ingresar el infractor');
    }
  }

  public async update({
    id,
    nombre,
    direccion,
    fecha,
  }: {
    id: number;
    nombre: string;
    direccion: string;
    fecha: string;
  }) {
    try {
      await Infractor.update({
        nombre,
        direccion,
        fecha: new Date(fecha),
      }, {
        where: { id },
      });
    } catch (e) {
      console.error('Error en la db al actualizar el infractor: ', e);
      throw new Error('Error en la db al actualizar el infractor');
    }
  }

  public async setActive({ id, estado }: { id: number; estado: number }) {
    try {
      await Infractor.update({ estado }, {
        where: { id },
      });
    } catch (e) {
      console.error('Error al cambiar el estado del infractor: ', e);
      throw new Error('Error al cambiar el estado del infractor');
    }
  }

  public async delete({ id }: { id: number }) {
    try {
      await Infractor.destroy({
        where: { id },
      });
    } catch (e) {
      console.error('Error al eliminar el infractor: ', e);
      throw new Error('Error al eliminar el infractor');
    }
  }
}

export default new InfractoresModel();
