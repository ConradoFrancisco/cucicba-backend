import { DataSource, Repository } from "typeorm";
import { Periodo } from "../../entity/Periodo";
import { getDataSource } from "../../data-source";

export default class AutoridadPeriodoService {
  private repository: Repository<Periodo>;

  constructor() {
    const ds: DataSource = getDataSource();
    this.repository = ds.manager.getRepository(Periodo);
  }

  public async getAll() {
    const [periodos] = await this.repository.findAndCount();
    return periodos;
  }
  public async getCurrentPeriodo(): Promise<Periodo | null> {
    const today = new Date();
    const currentPeriodo = await this.repository
      .createQueryBuilder("periodo")
      .where(":today BETWEEN periodo.fechaInicio AND periodo.fechaFin", {
        today,
      })
      .getOne();

    return currentPeriodo;
  }
}
