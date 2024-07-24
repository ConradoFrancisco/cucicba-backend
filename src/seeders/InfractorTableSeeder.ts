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
    infractor1.estado = true;

    const infractor2 = new Infractor();
    infractor2.nombre = "411 Group";
    infractor2.fecha = new Date(2010, 9, 11);
    infractor2.direccion = "Avda. Pueyrredon 411 - piso 4 'H' - Caba";
    infractor2.estado = true;

    const infractor3 = new Infractor();
    infractor3.nombre = "Administracion Romero Feris";
    infractor3.fecha = new Date(2022, 10, 26);
    infractor3.direccion = "Avda. Rivadavia Nº 2057, P/B. 'E', CABA.";
    infractor3.estado = true;

    const infractor4 = new Infractor();
    infractor4.nombre = "Administración Romero Feris";
    infractor4.fecha = new Date(2011, 10, 11);
    infractor4.direccion = "Avda. Rivadavia 2057 - CABA";
    infractor4.estado = true;

    await cn.manager.save([infractor1, infractor2, infractor3, infractor4]);
  }
}

export default new InfractorTableSeeder();
