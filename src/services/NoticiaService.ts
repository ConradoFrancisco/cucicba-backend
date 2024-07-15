import { DataSource, FindManyOptions, Like, Repository } from "typeorm";
import { Noticia } from "../entity/Noticia";
import { ImagenNoticia } from "../entity/ImagenNoticia";
import { getDataSource } from "../data-source";
import { ParamsDto } from "../dtos/ParamsDto";
import { NoticiaDto } from "../dtos/NoticiaDto";
import { ActiveParamsDto } from "../dtos/ActiveParamsDto";
import { DeleteParamsDto } from "../dtos/DeleteParamsDto";

export class NoticiaService {
  private repository: Repository<Noticia>;
  private categoriaRepository: Repository<ImagenNoticia>;

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
    };

    const [data, total] = await this.repository.findAndCount(options);

    const preguntasFrecuentesDto = data.map(
      (noticia) => new NoticiaDto(noticia)
    );

    return { data: preguntasFrecuentesDto, total };
  }
  public async create(p: NoticiaDto): Promise<Noticia> {
    const noticia = new Noticia();
    noticia.cuerpo = p.cuerpo;
    noticia.descripcion = p.descripcion;
    noticia.fecha = p.fecha;
    noticia.titulo = p.titulo;
    noticia.orden = p.orden;
    const preguntaGuardada = await this.repository.save(noticia);
    return preguntaGuardada;
  }

  public async update(p: NoticiaDto): Promise<Noticia | null> {
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
  }
}
