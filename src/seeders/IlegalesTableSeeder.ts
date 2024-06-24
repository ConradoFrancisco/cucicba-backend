import { DataSource } from "typeorm";
import { Ilegal } from "../entity/servicios/Ilegal";

class IlegalesTableSeeder {
  constructor() {
    // code here ...
  }

  public async run(cn: DataSource = null) {
    if (cn.driver.options.type === "sqlite")
      await cn.manager.query("DELETE FROM inmobiliaria_ilegal;");
    else
      await cn.manager.query(
        "TRUNCATE TABLE public.inmobiliaria_ilegal RESTART IDENTITY CASCADE;"
      );

    //SIN CAUSA
    const inmobiliariaIlegal1 = new Ilegal();
    inmobiliariaIlegal1.nombre =
      "2211 Negocios Inmobiliarios y/o Altamirano Luis Antonio";
    inmobiliariaIlegal1.direccion = "Tres Arroyos 2628, CABA.";
    inmobiliariaIlegal1.fecha = new Date(2017, 15, 8);
    inmobiliariaIlegal1.penal = false;

    const inmobiliariaIlegal2 = new Ilegal();
    inmobiliariaIlegal2.nombre =
      "1832 Negocios Inmobiliarios y/o Jabornik Fernando Bruno";
    inmobiliariaIlegal2.direccion =
      "Leandro N. Alem 260, Lomas de Zamora, Prov. de Bs. As.";
    inmobiliariaIlegal2.fecha = new Date(2015, 29, 9);
    inmobiliariaIlegal2.penal = false;

    //CON CAUSA
    const inmobiliariaIlegal3 = new Ilegal();
    inmobiliariaIlegal3.nombre =
      "A. MAGGIO ORG. INMOBILIARIA y/o ESTUDIO MAGGIO PROPIEDADES y/o A. MAGGIO PROPIEDADES";
    inmobiliariaIlegal3.direccion =
      "Bolivar 297 - Ramos Mejia - Pcia. de Bs.As.";
    inmobiliariaIlegal3.fecha = new Date(2011, 10, 7);
    inmobiliariaIlegal3.penal = true;

    const inmobiliariaIlegal4 = new Ilegal();
    inmobiliariaIlegal4.nombre =
      "ABREU & NOGUEIRAS PROPIEDADES y/o ABREU PROPIEDADES y/o ABREU, PABLO MARTIN";
    inmobiliariaIlegal4.direccion =
      "Bolivar 297 - Ramos Mejia - Pcia. de Bs.As.";
    inmobiliariaIlegal4.fecha = new Date(2023, 8, 3);
    inmobiliariaIlegal4.penal = true;

    await cn.manager.save([
      inmobiliariaIlegal1,
      inmobiliariaIlegal2,
      inmobiliariaIlegal3,
      inmobiliariaIlegal4,
    ]);
  }
}

export default new IlegalesTableSeeder();
