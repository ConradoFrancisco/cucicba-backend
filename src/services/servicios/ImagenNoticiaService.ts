import { DataSource, FindManyOptions, Like, Repository } from "typeorm";
import { ImagenNoticia } from "../../entity/ImagenNoticia";
import { getDataSource } from "../../data-source";
import { ImagenNoticiaDto } from "../../dtos/ImagenNoticiaDto";

export class ImagenNoticiaService {
  private repository: Repository<ImagenNoticia>;

  constructor() {
    const ds: DataSource = getDataSource();
    this.repository = ds.manager.getRepository(ImagenNoticia);
  }
  public async getAll({ id }: { id: number }) {
    const where: FindManyOptions<ImagenNoticia>["where"] = {};
    where.deletedAt != null;
    where.noticia = { id };
    const options: any = {
      where,
    };

    const [data, total] = await this.repository.findAndCount(options);

    const imagenNoticiaDto = data.map(
      (noticia) => new ImagenNoticiaDto(noticia)
    );

    return { data, total };
  }

  public async create(p: ImagenNoticia): Promise<ImagenNoticia> {
    const imagen = new ImagenNoticia();
    imagen.url = p.url;
    imagen.noticia = p.noticia;
    const imagenGuardada = await this.repository.save(imagen);
    return imagenGuardada;
  }

  /* public async update(p: NoticiaDto): Promise<Noticia | null> {
    const noticiaExistente = await this.repository.findOneBy({
      id: p.id,
    });
    if (!noticiaExistente) {
      return null;
    }
    noticiaExistente.cuerpo = p.cuerpo;
    noticiaExistente.descripcion = p.descripcion;
    noticiaExistente.fecha = p.fecha;
    noticiaExistente.titulo = p.titulo;
    noticiaExistente.orden = p.orden;

    noticiaExistente.updatedAt = new Date();

    const inmobiliariaActualizada = await this.repository.save(
      noticiaExistente
    );
    return inmobiliariaActualizada;
  }
  public async setState(p: ActiveParamsDto): Promise<Noticia | null> {
    const noticiaExistente = await this.repository.findOneBy({
      id: p.id,
    });
    if (!noticiaExistente) {
      return null;
    }
    noticiaExistente.estado = p.estado;
    noticiaExistente.updatedAt = p.updatedAt;

    const noticiaActualizada = await this.repository.save(noticiaExistente);
    return noticiaActualizada;
  }
  public async delete(p: DeleteParamsDto): Promise<Noticia | null> {
    const noticiaExistente = await this.repository.findOneBy({
      id: p.id,
    });
    if (!noticiaExistente) {
      return null;
    }
    noticiaExistente.deletedAt = p.deletedAt;
    noticiaExistente.updatedAt = p.deletedAt;
    return await this.repository.save(noticiaExistente);
  } */
}
