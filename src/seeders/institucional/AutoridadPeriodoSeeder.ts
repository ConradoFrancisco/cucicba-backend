import { DataSource } from "typeorm";
import { Periodo } from "../../entity/Periodo";

class AutoridadPeriodoSeeder {
  public async run(cn: DataSource = null) {
    if (cn.driver.options.type === "sqlite") {
      await cn.manager.query("DELETE FROM periodo");
    } else {
      await cn.manager.query(
        "TRUNCATE TABLE public.periodo RESTART IDENTITY CASCADE;"
      );
    }

    const periodosData = [
      {
        nombre: "AUTORIDADES PERIODO 2023/2025",
        fechaInicio: new Date("2023-01-01"),
        fechaFin: new Date("2025-12-31"),
      },
      {
        nombre: "AUTORIDADES PERIODO 2021/2023",
        fechaInicio: new Date("2021-01-01"),
        fechaFin: new Date("2023-12-31"),
      },
      {
        nombre: "AUTORIDADES PERIODO 2019/2021",
        fechaInicio: new Date("2019-01-01"),
        fechaFin: new Date("2021-12-31"),
      },
      {
        nombre: "AUTORIDADES PERIODO 2017/2019",
        fechaInicio: new Date("2017-01-01"),
        fechaFin: new Date("2019-12-31"),
      },
      {
        nombre: "AUTORIDADES PERIODO 2015/2017",
        fechaInicio: new Date("2015-01-01"),
        fechaFin: new Date("2017-12-31"),
      },
      {
        nombre: "AUTORIDADES PERIODO 2013/2015",
        fechaInicio: new Date("2013-01-01"),
        fechaFin: new Date("2015-12-31"),
      },
    ];

    await cn.getRepository(Periodo).save(periodosData);
  }
}

export default new AutoridadPeriodoSeeder();
