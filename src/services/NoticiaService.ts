import {
  DataSource,
  FindManyOptions,
  LessThan,
  Like,
  MoreThan,
  Repository,
} from "typeorm";
import { Noticia } from "../entity/Noticia";
import { ImagenNoticia } from "../entity/ImagenNoticia";
import { getDataSource } from "../data-source";
import { ParamsDto } from "../dtos/ParamsDto";
import { NoticiaDto } from "../dtos/NoticiaDto";
import { ActiveParamsDto } from "../dtos/ActiveParamsDto";
import { DeleteParamsDto } from "../dtos/DeleteParamsDto";
import { ImagenNoticiaService } from "./servicios/ImagenNoticiaService";

export class NoticiaService {
  private repository: Repository<Noticia>;
  private categoriaRepository: Repository<ImagenNoticia>;
  private static imageService: ImagenNoticiaService =
    new ImagenNoticiaService();
  constructor() {
    const ds: DataSource = getDataSource();
    this.repository = ds.manager.getRepository(Noticia);
    this.categoriaRepository = ds.manager.getRepository(ImagenNoticia);
  }
  public async getAll(p: ParamsDto) {
    const where: FindManyOptions<Noticia>["where"] = {};
    where.deletedAt != null;
    if (p.input) {
      where.cuerpo = Like(`%${p.input}%`);
    }

    if (p.estado !== null) {
      where.estado = p.estado;
    }

    const order: FindManyOptions<Noticia>["order"] = {};
    if (p.orderBy) {
      order[p.orderBy] = p.orderDirection || "ASC";
    }
    const options: any = {
      where,
      order,
      take: p.limit,
      skip: p.offset,
      relations: ["imagenes"],
    };

    const [data, total] = await this.repository.findAndCount(options);
    const noticiaDto = data.map((noticia) => new NoticiaDto(noticia));

    return { data: noticiaDto, total };
  }
  public async getByid(id: number): Promise<NoticiaDto | null> {
    // Consulta para la noticia actual
    const noticiaExistente = await this.repository.findOne({
      where: { id: id },
      relations: ["imagenes"], // Incluir la relación con las imágenes
    });

    if (!noticiaExistente) {
      return null;
    }

    // Consulta para la noticia anterior
    const noticiaAnterior = await this.repository.findOne({
      where: {
        id: LessThan(id),
        estado: true,
        deletedAt: null,
      },
      order: { id: "DESC" },
      select: ["id"],
    });

    // Consulta para la noticia siguiente
    const noticiaSiguiente = await this.repository.findOne({
      where: {
        id: MoreThan(id),
        estado: true,
        deletedAt: null,
      },
      order: { id: "ASC" },
      select: ["id"],
    });

    const data = new NoticiaDto(noticiaExistente);

    // Añadir los IDs de la noticia anterior y siguiente al DTO
    data.previousId = noticiaAnterior ? noticiaAnterior.id : null;
    data.nextId = noticiaSiguiente ? noticiaSiguiente.id : null;

    return data;
  }
  public async create(titulo: string): Promise<Noticia> {
    const noticia = new Noticia();
    noticia.titulo = titulo;
    const noticiaGuardada = await this.repository.save(noticia);
    return noticiaGuardada;
  }

  public async update(p: NoticiaDto): Promise<any | null> {
    console.log("id", p.id);
    const noticiaExistente = await this.repository.findOneBy({
      id: p.id,
    });
    console.log(noticiaExistente);
    if (!noticiaExistente) {
      return null;
    }
    noticiaExistente.cuerpo = p.cuerpo;
    noticiaExistente.descripcion = p.descripcion;
    noticiaExistente.fecha = p.fecha;
    noticiaExistente.titulo = p.titulo;
    noticiaExistente.orden = p.orden;

    if (p.imagenes.length !== 0) {
      for (const urlImage of p.imagenes) {
        const imagenNoticia = new ImagenNoticia();
        imagenNoticia.url = urlImage;
        imagenNoticia.noticia = noticiaExistente;
        await NoticiaService.imageService.create(imagenNoticia);
      }
    }

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
  }
}
