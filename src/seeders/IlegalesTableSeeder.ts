import { DataSource } from "typeorm";
import { Ilegal } from "../entity/Ilegal";

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
    inmobiliariaIlegal1.estado = true;

    const inmobiliariaIlegal5 = new Ilegal();
    inmobiliariaIlegal5.nombre = "A & A y/o Aline Franca Lopes";
    inmobiliariaIlegal5.direccion =
      "Espinosa 28, Piso 6º, Dpto. 'D', Torre II, CABA.";
    inmobiliariaIlegal5.fecha = new Date(2017, 29, 6);
    inmobiliariaIlegal5.penal = false;
    inmobiliariaIlegal5.estado = true;

    const inmobiliariaIlegal6 = new Ilegal();
    inmobiliariaIlegal6.nombre = "A. Maggio Organizacion Inmobiliaria";
    inmobiliariaIlegal6.direccion =
      "Bolivar 297 - Ramos Mejia - Pcia. de Bs.As.";
    inmobiliariaIlegal6.fecha = new Date(2011, 10, 7);
    inmobiliariaIlegal6.penal = false;
    inmobiliariaIlegal6.estado = true;

    const inmobiliariaIlegal2 = new Ilegal();
    inmobiliariaIlegal2.nombre =
      "1832 Negocios Inmobiliarios y/o Jabornik Fernando Bruno";
    inmobiliariaIlegal2.direccion =
      "Leandro N. Alem 260, Lomas de Zamora, Prov. de Bs. As.";
    inmobiliariaIlegal2.fecha = new Date(2015, 29, 9);
    inmobiliariaIlegal2.penal = false;
    inmobiliariaIlegal2.estado = true;

    //CON CAUSA
    const inmobiliariaIlegal3 = new Ilegal();
    inmobiliariaIlegal3.nombre =
      "A. MAGGIO ORG. INMOBILIARIA y/o ESTUDIO MAGGIO PROPIEDADES y/o A. MAGGIO PROPIEDADES";
    inmobiliariaIlegal3.direccion =
      "Bolivar 297 - Ramos Mejia - Pcia. de Bs.As.";
    inmobiliariaIlegal3.fecha = new Date(2011, 10, 7);
    inmobiliariaIlegal3.penal = true;
    inmobiliariaIlegal3.estado = true;

    const inmobiliariaIlegal4 = new Ilegal();
    inmobiliariaIlegal4.nombre =
      "ABREU & NOGUEIRAS PROPIEDADES y/o ABREU PROPIEDADES y/o ABREU, PABLO MARTIN";
    inmobiliariaIlegal4.direccion =
      "Bolivar 297 - Ramos Mejia - Pcia. de Bs.As.";
    inmobiliariaIlegal4.fecha = new Date(2023, 8, 3);
    inmobiliariaIlegal4.penal = true;
    inmobiliariaIlegal4.estado = true;

    const inmobiliariaIlegal7 = new Ilegal();
    inmobiliariaIlegal7.nombre = "Aiello Inmuebles y/o Eduardo Angel Aiello";
    inmobiliariaIlegal7.direccion =
      "Bolivar 357, Piso 1º, Ramos Mejía, Pcia. de Bs. As.";
    inmobiliariaIlegal7.fecha = new Date(2022, 1, 8);
    inmobiliariaIlegal7.penal = true;
    inmobiliariaIlegal7.estado = true;

    const inmobiliariaIlegal8 = new Ilegal();
    inmobiliariaIlegal8.nombre =
      "Freire Inmobiliaria y/o Amenta Maria Cristina";
    inmobiliariaIlegal8.direccion = "Gral. Ramon Freire 2423, CABA.";
    inmobiliariaIlegal8.fecha = new Date(2018, 4, 12);
    inmobiliariaIlegal8.penal = true;
    inmobiliariaIlegal8.estado = true;

    await cn.manager.save([
      inmobiliariaIlegal1,
      inmobiliariaIlegal2,
      inmobiliariaIlegal3,
      inmobiliariaIlegal4,
      inmobiliariaIlegal5,
      inmobiliariaIlegal6,
      inmobiliariaIlegal7,
      inmobiliariaIlegal8,
    ]);
  }
}

export default new IlegalesTableSeeder();
