import { DataSource, FindManyOptions, ILike, Like, Repository } from "typeorm";
import { getDataSource } from "../../data-source";
import { ParamsDto } from "../../dtos/ParamsDto";
import { ActiveParamsDto } from "../../dtos/ActiveParamsDto";
import { DeleteParamsDto } from "../../dtos/DeleteParamsDto";
import { PreguntaFrecuente } from "../../entity/PreguntaFrecuente";
import { PreguntaFrecuenteDto } from "../../dtos/servicios/PreguntaFrecuenteDto";
import { CategoriasPreguntasFrecuentes } from "../../entity/CategoriasPreguntasFrecuentes";


export class PreguntaFrecuenteService {
  private repository: Repository<PreguntaFrecuente>;
  private categoriaRepository: Repository<CategoriasPreguntasFrecuentes>;

  constructor() {
    const ds: DataSource = getDataSource();
    this.repository = ds.manager.getRepository(PreguntaFrecuente);
    this.categoriaRepository = ds.manager.getRepository(
      CategoriasPreguntasFrecuentes
    );
  }
  public async getAll(p: ParamsDto) {
    const where: FindManyOptions<PreguntaFrecuente>["where"] = {};
    console.log("servicio limit:", p.limit);
    where.deletedAt != null;
    if (p.input) {
      where.pregunta = ILike(`%${p.input}%`);
    }

    if (p.estado !== null) {
      where.estado = p.estado;
    }

    where.categoria = { id: p.categoriaId };

    const order: FindManyOptions<PreguntaFrecuente>["order"] = {};
    if (p.orderBy) {
      order[p.orderBy] = p.orderDirection || "ASC";
    }
    const options: any = {
      where,
      order,
      take: p.limit,
      skip: p.offset,
      relations: ["categoria"],
    };

    const [data, total] = await this.repository.findAndCount(options);

    const preguntasFrecuentesDto = data.map(
      (pregunta) => new PreguntaFrecuenteDto(pregunta)
    );

    return { data: preguntasFrecuentesDto, total };
  }
  public async getAllCategorias() {
    const categorias = await this.categoriaRepository.find();
    return categorias;
  }
  public async create(p: PreguntaFrecuenteDto): Promise<PreguntaFrecuente> {
    const preguntaFrecuente = new PreguntaFrecuente();
    preguntaFrecuente.pregunta = p.pregunta;
    preguntaFrecuente.respuesta = p.respuesta;
    if (p.categoria) {
      const categoria = await this.categoriaRepository.findOneBy({
        id: p.categoria.id,
      });
      console.log(p.categoria);
      console.log(categoria);
      if (categoria) {
        preguntaFrecuente.categoria = categoria;
      } else {
        throw new Error(`No se encontró la categoría con ID ${p.categoria}`);
      }
    }

    const preguntaGuardada = await this.repository.save(preguntaFrecuente);
    return preguntaGuardada;
  }

  public async update(
    p: PreguntaFrecuenteDto
  ): Promise<PreguntaFrecuente | null> {
    const PreguntaExistente = await this.repository.findOneBy({
      id: p.id,
    });
    if (!PreguntaExistente) {
      return null;
    }
    PreguntaExistente.pregunta = p.pregunta;
    PreguntaExistente.respuesta = p.respuesta;
    if (p.categoria) {
      const category = await this.categoriaRepository.findOneBy({
        id: p.categoria.id,
      });
      PreguntaExistente.categoria = category;
    }

    PreguntaExistente.updatedAt = new Date();

    const inmobiliariaActualizada = await this.repository.save(
      PreguntaExistente
    );
    return inmobiliariaActualizada;
  }
  public async setState(p: ActiveParamsDto): Promise<PreguntaFrecuente | null> {
    const PreguntaExistente = await this.repository.findOneBy({
      id: p.id,
    });
    if (!PreguntaExistente) {
      return null;
    }
    PreguntaExistente.estado = p.estado;
    PreguntaExistente.updatedAt = p.updatedAt;

    const areaActualizada = await this.repository.save(PreguntaExistente);
    return areaActualizada;
  }
  public async delete(p: DeleteParamsDto): Promise<PreguntaFrecuente | null> {
    const PreguntaExistente = await this.repository.findOneBy({
      id: p.id,
    });
    if (!PreguntaExistente) {
      return null;
    }
    PreguntaExistente.deletedAt = p.deletedAt;
    PreguntaExistente.updatedAt = p.deletedAt;
    return await this.repository.save(PreguntaExistente);
  }
}
