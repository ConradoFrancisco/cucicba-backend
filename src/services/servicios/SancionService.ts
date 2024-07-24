import { DataSource, FindManyOptions, ILike, Like, Repository } from "typeorm";
import { getDataSource } from "../../data-source";
import { ParamsDto } from "../../dtos/ParamsDto";
import { ActiveParamsDto } from "../../dtos/ActiveParamsDto";
import { DeleteParamsDto } from "../../dtos/DeleteParamsDto";
import { PreguntaFrecuente } from "../../entity/servicios/PreguntaFrecuente";
import { PreguntaFrecuenteDto } from "../../dtos/servicios/PreguntaFrecuenteDto";
import { CategoriasPreguntasFrecuentes } from "../../entity/servicios/Categoria_pregunta_frecuente";
import { Sancion } from "../../entity/servicios/Sancion";
import { CategoriaSancion } from "../../entity/servicios/Categoria_sancion";
import { SancionDto } from "../../dtos/servicios/SancionDto";

export class SancionService {
  private repository: Repository<Sancion>;
  private categoriaRepository: Repository<CategoriaSancion>;

  constructor() {
    const ds: DataSource = getDataSource();
    this.repository = ds.manager.getRepository(Sancion);
    this.categoriaRepository = ds.manager.getRepository(CategoriaSancion);
  }
  public async getAll(p: ParamsDto) {
    const where: FindManyOptions<Sancion>["where"] = {};
    where.deletedAt != null;
    if (p.input) {
      where.descripcion = ILike(`%${p.input}%`);
    }

    if (p.estado !== null) {
      where.estado = p.estado;
    }

    where.categoria = { id: p.categoriaId };

    const order: FindManyOptions<Sancion>["order"] = {};
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

    const sancionDto = data.map((sancion) => new SancionDto(sancion));

    return { data: sancionDto, total };
  }
  public async getAllCategorias() {
    const categorias = await this.categoriaRepository.find();
    return categorias;
  }
  public async create(p: SancionDto): Promise<void> {
    const sancion = new Sancion();
    sancion.descripcion = p.descripcion;
    sancion.archivo = p.archivo;
    sancion.createdAt = p.created_at;
    if (p.categoria) {
      const categoria = await this.categoriaRepository.findOneBy({
        id: p.categoria.id,
      });
      console.log(p.categoria);
      console.log(categoria);
      if (categoria) {
        sancion.categoria = categoria;
      } else {
        throw new Error(`No se encontró la categoría con ID ${p.categoria}`);
      }
    }

    await this.repository.save(sancion);
  }

  public async update(p: SancionDto): Promise<void | null> {
    const sancionExistente = await this.repository.findOneBy({
      id: p.id,
    });
    if (!sancionExistente) {
      return null;
    }
    sancionExistente.descripcion = p.descripcion;
    sancionExistente.archivo = p.archivo;
    if (p.categoria) {
      const categoria = await this.categoriaRepository.findOneBy({
        id: p.categoria.id,
      });
      console.log(p.categoria);
      console.log(categoria);
      if (categoria) {
        sancionExistente.categoria = categoria;
      } else {
        throw new Error(`No se encontró la categoría con ID ${p.categoria}`);
      }
    }

    sancionExistente.updatedAt = new Date();

    await this.repository.save(sancionExistente);
  }
  public async setState(p: ActiveParamsDto): Promise<void | null> {
    const sancionExistente = await this.repository.findOneBy({
      id: p.id,
    });
    if (!sancionExistente) {
      return null;
    }
    sancionExistente.estado = p.estado;
    sancionExistente.updatedAt = p.updatedAt;

    await this.repository.save(sancionExistente);
  }
  public async delete(p: DeleteParamsDto): Promise<void | null> {
    const sancionExistente = await this.repository.findOneBy({
      id: p.id,
    });
    if (!sancionExistente) {
      return null;
    }
    sancionExistente.deletedAt = p.deletedAt;
    sancionExistente.updatedAt = p.deletedAt;
    await this.repository.save(sancionExistente);
  }
}
