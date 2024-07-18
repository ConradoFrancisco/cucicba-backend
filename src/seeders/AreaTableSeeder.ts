import { DataSource } from "typeorm";
import { Area } from "../entity/Area";

class AreaTableSeeder {
  constructor() {
    // code here ...
  }

  public async run(cn: DataSource = null) {
    if (cn.driver.options.type === "sqlite")
      await cn.manager.query("DELETE FROM area;");
    else
      await cn.manager.query(
        "TRUNCATE TABLE public.area RESTART IDENTITY CASCADE;"
      );

    const areas = [
      {
        nombre: "RECEPCIÓN",
        descripcion: "Área de recepción de la empresa.",
        estado: true,
        orden: 1,
      },
      {
        nombre: "SECRETARIA DE CONSEJO DIRECTIVO",
        descripcion: "Área de secretaría de consejo directivo.",
        estado: true,
        orden: 2,
      },
      {
        nombre: "MATRICULADOS",
        descripcion: "Área de matriculados.",
        estado: true,
        orden: 3,
      },
      {
        nombre: "FISCALIZACIÓN",
        descripcion: "Área de fiscalización.",
        estado: true,
        orden: 4,
      },
      {
        nombre:
          "FISCALIZACION E INSPECCIONES ADMINISTRACION DE FISCALIZACION - INFRACTORES",
        descripcion: "Área de administración de fiscalización e infractores.",
        estado: true,
        orden: 5,
      },
      {
        nombre:
          "ADMINISTRACION DE FISCALIZACION ILEGALES E INFRACTORES DE EXTRAÑA JURISDICCION",
        descripcion:
          "Área de administración de fiscalización ilegales e infractores de extraña jurisdicción.",
        estado: true,
        orden: 6,
      },
      {
        nombre: "CUERPO DE INSPECTORES / NOTIFICADORES",
        descripcion: "Área del cuerpo de inspectores / notificadores.",
        estado: true,
        orden: 7,
      },
      {
        nombre: "LEGALES",
        descripcion: "Área de legales.",
        estado: true,
        orden: 8,
      },
      {
        nombre: "TRIBUNAL DE ETICA Y DISCIPLINA",
        descripcion: "Área del tribunal de ética y disciplina.",
        estado: true,
        orden: 9,
      },
      {
        nombre: "COMUNICACION, WEB, CABAPROP, REVISTA CUCICBA",
        descripcion: "Área de comunicación, web, Cabaprop, revista Cucicba.",
        estado: true,
        orden: 10,
      },
      {
        nombre: "ACTIVIDADES ACADEMICAS",
        descripcion: "Área de actividades académicas.",
        estado: true,
        orden: 11,
      },
      {
        nombre: "REDES SOCIALES",
        descripcion: "Área de redes sociales.",
        estado: true,
        orden: 12,
      },
      {
        nombre: "ADMINISTRACION Y FINANZAS",
        descripcion: "Área de administración y finanzas.",
        estado: true,
        orden: 13,
      },
      {
        nombre: "CONTROLLER Y RESP. RRHH",
        descripcion: "Área de controller y responsabilidad de RRHH.",
        estado: true,
        orden: 14,
      },
    ];

    const areaEntities = areas.map((areaData) => {
      const area = new Area();
      area.nombre = areaData.nombre;
      area.estado = areaData.estado;
      area.orden = areaData.orden;
      return area;
    });

    await cn.manager.save(areaEntities);
  }
}

export default new AreaTableSeeder();
