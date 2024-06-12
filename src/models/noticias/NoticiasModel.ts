import { Op } from 'sequelize';
import Noticia from './Noticia';
import Imagen from './Imagen';
import { sequelize } from '../../Database';

class NoticiasModel {
  public async getAll({
    titulo,
    input,
    fecha,
    limit,
    offset = 0,
    orderBy = "orden",
    orderDirection = "ASC",
    estado = undefined
  }: {
    input?: string;
    limit?: number;
    offset?: number;
    titulo?: string;
    fecha?: string;
    orderBy?: string;
    orderDirection?: "ASC" | "DESC";
    estado?:number
  }) {
    const where: any = {};
    if (input) {
      where.title = { [Op.like]: `%${input}%` };
    }
    if (titulo) {
      where.title = { [Op.like]: `%${titulo}%` };
    }
    if (fecha) {
      where.date = { [Op.eq]: new Date(fecha) };
    }
    if (estado || estado === 0)  {
      where.estado = { [Op.eq]: estado };
    }

    try {
      // Consulta para obtener los datos
      const data = await Noticia.findAll({
        where,
        limit,
        offset,
        order: [[orderBy, orderDirection]],
        include: [{
          model: Imagen,
          attributes: ['imageUrl'],
        }],
        
      });

      // Consulta para obtener el total
      const total = await Noticia.count({
        where,
      });

      return { data, total };
    } catch (e) {
      console.error(e);
      throw new Error("Hubo un error con la db");
    }
  }
  public async deleteImage({ id }: { id: number }) {
    try {
      await Imagen.destroy({
        where: { id },
      });
    } catch (e) {
      console.error("Error al eliminar la imagen:", e);
      throw new Error("Error al eliminar la imagen");
    }
  }

  public async create({
    date,
    title,
    description,
    cantFotos = 0,
    body,
    orden,
  }: {
    date: string;
    title: string;
    description: string;
    cantFotos?: number;
    body: string;
    orden: number;
  }) {
    try {
      const noticia = await Noticia.create({
        date,
        title,
        description,
        cantFotos,
        body,
        orden,
      });
      return noticia.id;
    } catch (e) {
      console.error("Error en la db al crear la noticia: ", e);
      throw new Error("Error en la db al crear la noticia");
    }
  }

  public async updatear({
    id,
    date,
    title,
    description,
    cantFotos,
    body,
    orden,
    filePaths = [],
  }: {
    id: number;
    date?: string;
    title?: string;
    description?: string;
    cantFotos?: number;
    body?: string;
    orden?: number;
    filePaths?: string[];
  }) {
    const transaction = await sequelize.transaction();
    try {
      // Actualizar el registro de la noticia
      const noticia = await Noticia.update(
        {
          date,
          title,
          description,
          cantFotos,
          body,
          orden,
        },
        {
          where: { id },
          transaction,
        }
      );

      // Actualizar imágenes si se proporcionan nuevos filePaths
      if (filePaths.length > 0) {
        // Eliminar imágenes antiguas
        await Imagen.destroy({
          where: { noticia_id: id },
          transaction,
        });

        // Insertar nuevas imágenes
        const images = filePaths.map((filePath) => ({
          noticia_id: id,
          imageUrl: filePath,
        }));
        await Imagen.bulkCreate(images, { transaction });
      }

      await transaction.commit();
      return noticia;
    } catch (e) {
      await transaction.rollback();
      console.error("Error al actualizar la noticia y sus imágenes:", e);
      throw new Error("Error al actualizar la noticia y sus imágenes");
    }
  }
  public async createImagesRegister({
    id_noticia,
    filePaths = [],
  }: {
    id_noticia: number;
    filePaths: string[];
  }) {
    if (filePaths.length === 0) {
      throw new Error("No file paths provided");
    }
    const images = filePaths.map(filePath => ({
      noticia_id: id_noticia,
      imageUrl: filePath,
    }));

    try {
      await Imagen.bulkCreate(images);
    } catch (error) {
      console.error("Error al insertar imágenes:", error);
      throw error;
    }
  }

  public async getById({ id }: { id: number }) {
    try {
      // Consulta para obtener la noticia actual
      const noticia = await Noticia.findOne({
        where: { id },
        include: [{
          model: Imagen,
          attributes: ['imageUrl'],
        }],
      });

      if (!noticia) throw new Error("Noticia no encontrada");

      // Consulta para obtener el ID de la siguiente noticia
      const siguienteNoticia = await Noticia.findOne({
        where: {
          id: { [Op.gt]: id },
        },
        order: [['id', 'ASC']],
        attributes: ['id'],
      });

      const siguienteId = siguienteNoticia ? siguienteNoticia.id : null;

      // Consulta para obtener el ID de la noticia anterior
      const anteriorNoticia = await Noticia.findOne({
        where: {
          id: { [Op.lt]: id },
        },
        order: [['id', 'DESC']],
        attributes: ['id'],
      });

      const anteriorId = anteriorNoticia ? anteriorNoticia.id : null;

      return { noticia, siguienteId, anteriorId };
    } catch (e) {
      console.error("Error en la db al obtener la noticia: ", e);
      throw new Error("Error en la db al obtener la noticia");
    }
  }

  public async setActive({ id, estado }: { id: number; estado: number }) {
    try {
      await Noticia.update({ estado }, {
        where: { id },
      });
    } catch (e) {
      console.error("Error al cambiar el estado de la noticia: ", e);
      throw new Error("Error al cambiar el estado de la noticia");
    }
  }
  public async delete({ id }: { id: number }) {
    const transaction = await sequelize.transaction();
    try {
      // Eliminar imágenes relacionadas
      await Imagen.destroy({
        where: { noticia_id: id },
        transaction,
      });

      // Eliminar la noticia
      await Noticia.destroy({
        where: { id },
        transaction,
      });

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      console.error("Error al eliminar la noticia y sus imágenes:", e);
      throw new Error("Error al eliminar la noticia y sus imágenes");
    }
  }

}

export default new NoticiasModel();
