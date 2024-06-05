import { Op } from 'sequelize';
import Noticia from './Noticia';
import Imagen from './Imagen';

class NoticiasModel {
  public async getAll({
    titulo,
    input,
    fecha,
    limit,
    offset = 0,
    orderBy = "orden",
    orderDirection = "ASC",
  }: {
    input?: string;
    limit?: number;
    offset?: number;
    titulo?: string;
    fecha?: string;
    orderBy?: string;
    orderDirection?: "ASC" | "DESC";
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
      const noticia = await Noticia.findOne({
        where: { id },
        include: [{
          model: Imagen,
          attributes: ['imageUrl'],
        }],
      });

      if (!noticia) throw new Error("Noticia no encontrada");

      return { noticia };
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
}

export default new NoticiasModel();
