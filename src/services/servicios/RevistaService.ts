import { DataSource, FindManyOptions, ILike, Like, Repository } from "typeorm";
import { getDataSource } from "../../data-source";
import { ParamsDto } from "../../dtos/ParamsDto";
import { ActiveParamsDto } from "../../dtos/ActiveParamsDto";
import { DeleteParamsDto } from "../../dtos/DeleteParamsDto";
import { Revista } from "../../entity/servicios/Revista";
import { RevistaDto } from "../../dtos/servicios/RevistaDto";

export default class RevistaService {
  private repository: Repository<Revista>;

  constructor() {
    const ds: DataSource = getDataSource();
    this.repository = ds.manager.getRepository(Revista);
  }

  public async getAll(
    p: ParamsDto
  ): Promise<{ data: RevistaDto[]; total: number }> {
    const where: FindManyOptions<Revista>["where"] = {};
    where.deletedAt != null;
    if (p.input) {
      where.descripcion = ILike(`%${p.input}%`);
    }

    if (p.estado !== null) {
      where.estado = p.estado;
    }

    const order: FindManyOptions<Revista>["order"] = {};
    if (p.orderBy) {
      order[p.orderBy] = p.orderDirection || "ASC";
    }
    const options: any = {
      where,
      order,
      take: p.limit,
      skip: p.offset,
    };

    const [revsitas, total] = await this.repository.findAndCount(options);
    const revistasDto: RevistaDto[] = revsitas.map(
      (revista) => new RevistaDto(revista)
    );
    return { data: revistasDto, total };
  }

  public async create(revista: RevistaDto): Promise<void> {
    await this.repository.save(revista);
  }

  public async update(revista: RevistaDto): Promise<void> {
    const revistaExistente = await this.repository.findOneBy({
      id: revista.id,
    });
    if (!revistaExistente) {
      return null;
    }
    revistaExistente.descripcion = revista.descripcion;
    revistaExistente.archivo = revista.archivo;
    revistaExistente.imagen = revista.imagen;
    revistaExistente.fecha = revista.fecha;
    revistaExistente.updatedAt = new Date();

    await this.repository.save(revistaExistente);
  }

  public async setState(p: ActiveParamsDto): Promise<void> {
    const revistaExistente = await this.repository.findOneBy({
      id: p.id,
    });
    if (!revistaExistente) {
      return null;
    }
    revistaExistente.estado = p.estado;
    revistaExistente.updatedAt = p.updatedAt;

    await this.repository.save(revistaExistente);
  }

  public async delete(p: DeleteParamsDto): Promise<Revista | null> {
    const revistaExistente = await this.repository.findOneBy({
      id: p.id,
    });
    if (!revistaExistente) {
      return null;
    }
    revistaExistente.deletedAt = p.deletedAt;
    revistaExistente.updatedAt = p.deletedAt;

    return await this.repository.save(revistaExistente);
  }
}
