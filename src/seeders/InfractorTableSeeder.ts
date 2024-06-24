import { DataSource } from "typeorm";
import { Infractor } from "../entity/servicios/Infractor";

class InfractorTableSeeder {
  public async run(cn: DataSource = null) {
    if (cn.driver.options.type === "sqlite")
      await cn.manager.query("DELETE FROM infractor;");
    else
      await cn.manager.query(
        "TRUNCATE TABLE public.infractor RESTART IDENTITY CASCADE;"
      );

    const infractor1 = new Infractor();
    infractor1.nombre = "2H Arquitectos";
    infractor1.fecha = new Date(2012, 8, 5);
    infractor1.direccion = "Ramallo Nº 2551, Piso 1º, CABA.";
    const infractor2 = new Infractor();
    infractor2.nombre = "411 Group";
    infractor2.fecha = new Date(2010, 9, 11);
    infractor2.direccion = "Avda. Pueyrredon 411 - piso 4 'H' - Caba";

    await cn.manager.save([infractor1, infractor2]);
  }
}

export default new InfractorTableSeeder();
