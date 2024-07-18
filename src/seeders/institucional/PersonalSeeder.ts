import { DataSource } from "typeorm";
import { Area } from "../../entity/Area";
import { Personal } from "../../entity/institucional/Personal";

const personalData: any = [
  {
    title: "RECEPCIÓN",
    workers: [
      {
        id: 1,
        name: "María Elisa",
        lastname: "Alvarez",
        phone: "4124-6060",
        email: "recepcion@colegioinmobiliario.org.ar",
      },
    ],
  },
  {
    title: "SECRETARIA DE CONSEJO DIRECTIVO",
    workers: [
      {
        id: 2,
        name: "Dra. Adriana",
        lastname: "Campero",
        email: "acampero@colegioinmobiliario.org.ar",
      },
    ],
  },
  {
    title: "MATRICULADOS",
    workers: [
      {
        id: 3,
        name: "Sr. Federico",
        lastname: "Conte",
        position: "JEFE DE SERVICIOS AL MATRICULADO",
      },
      {
        id: 4,
        name: "Jorgelina",
        lastname: "González",
        phone: "4124-6083",
        email: "jgonzalez@colegioinmobiliario.org.ar",
        position: "ATENCIÓN AL MATRICULADO",
      },
    ],
  },
  {
    title: "FISCALIZACIÓN",
    workers: [
      {
        id: 5,
        name: "Mart. Samuel Roberto",
        lastname: "Kotlar",
        position:
          "JEFE DE FISCALIZACION, INSPECCIONES Y CONTROL DEL EJERCICIO PROFESIONAL",
      },
      {
        id: 6,
        name: "Mariano",
        lastname: "Marino",
        phone: "4124-6093",
        email: "mmarino@colegioinmobiliario.org.ar",
        position: "Sub-Jefe Administración de Infractores e Ilegales",
      },
    ],
  },
  {
    title:
      "FISCALIZACION E INSPECCIONES ADMINISTRACION DE FISCALIZACION - INFRACTORES",
    workers: [
      {
        id: 7,
        name: "Facundo",
        lastname: "Clemente",
        phone: "4124-6091",
        email: "fclemente@colegioinmobiliario.org.ar",
        position: "Supervisor",
      },
      {
        id: 8,
        name: "Pablo Sebastián",
        lastname: "Miguelez",
        phone: "4124-6095",
        email: "pmiguelez@colegioinmobiliario.org.ar",
        position: "Supervisor",
      },
    ],
  },
  {
    title:
      "ADMINISTRACION DE FISCALIZACION ILEGALES E INFRACTORES DE EXTRAÑA JURISDICCION",
    workers: [
      {
        id: 9,
        name: "Julieta",
        lastname: "Maggi",
        phone: "4124-6086",
        email: "jamaggi@colegioinmobiliario.org.ar ",
        position: "Administración",
      },
    ],
  },
  {
    title: "CUERPO DE INSPECTORES / NOTIFICADORES",
    workers: [
      {
        id: 10,
        name: "Martín Sosa",
        lastname: "Hernandéz",
        position: "Supervisor/Inspector/Notificador",
      },
      {
        id: 11,
        name: "Estanislao",
        lastname: "Zabala",
        position: "Inspector/Notificador",
      },
      {
        id: 12,
        name: "Carlos Federico",
        lastname: "Jauretche",
        position: "Inspector/Notificador",
      },
      {
        id: 13,
        name: "Néstor Aníbal Luquez",
        lastname: "Videla",
        position: "Inspector/Notificador",
      },
      {
        id: 14,
        name: "Luciano",
        lastname: "Mocchia",
        position: "Inspector/Notificador",
      },
    ],
  },
  {
    title: "LEGALES",
    workers: [
      {
        id: 17,
        name: "Dra. Carina",
        lastname: "Migale",
        position: "JEFE DE ASUNTOS LEGALES",
      },
      {
        id: 17,
        name: "Federico",
        lastname: "Agüero",
        phone: "4124-6078",
        position: "Asesoria Legal",
        email: "faguero@colegioinmobiliario.org.ar",
      },
      {
        id: 18,
        name: "Sebastian",
        lastname: "Elcano",
        phone: "4124-6077",
        position: "Asesoria Legal",
        email: "selcano@colegioinmobiliario.org.ar",
      },
      {
        id: 19,
        name: "Dra. Melina",
        lastname: "Acosta",
        phone: "4124-6076",
        email: "macosta@colegioinmobiliario.org.ar",
        position: "Senior Asuntos Legales",
      },
    ],
  },
  {
    title: "COMUNICACION, WEB, CABAPROP, REVISTA CUCICBA",
    workers: [
      {
        id: 20,
        name: "Salvador",
        lastname: "Curutchet",
        phone: "4124-6059",
        email: "scurutchet@colegioinmobiliario.org.ar",
      },
    ],
  },
  {
    title: "ACTIVIDADES ACADEMICAS",
    workers: [
      {
        id: 21,
        name: "Claudia",
        lastname: "Carral",
        phone: "4124-6085",
        email: "ccarral@colegioinmobiliario.org.ar",
      },
    ],
  },
  {
    title: "REDES SOCIALES",
    workers: [
      {
        id: 22,
        name: "Franco",
        lastname: "Duarte",
        phone: "4124-6054",
        email: "fduarte@colegioinmobiliario.org.ar",
      },
    ],
  },
  {
    title: "ADMINISTRACION Y FINANZAS",
    workers: [
      {
        id: 23,
        name: "María Laura",
        lastname: "Moyano",
        position: "JEFE DE ADMINISTRACION Y FINANZAS",
      },
      {
        id: 24,
        name: "Paula",
        lastname: "Amoroso",
        position: "COBRANZAS",
        phone: "4124-6050",
        email: "cobranzas@colegioinmobiliario.org.ar",
      },
    ],
  },
  {
    title: "CONTROLLER Y RESP. RRHH",
    workers: [
      {
        id: 25,
        name: "Lic. Jessica",
        lastname: "Massa",
      },
    ],
  },
];

class PersonalTableSeeder {
  constructor() {
    // code here ...
  }

  public async run(cn: DataSource = null) {
    if (cn.driver.options.type === "sqlite") {
      await cn.manager.query("DELETE FROM personal;");
    } else {
      await cn.manager.query(
        "TRUNCATE TABLE public.personal RESTART IDENTITY CASCADE;"
      );
    }

    for (const areaData of personalData) {
      const area = await cn.manager.findOne(Area, {
        where: { nombre: areaData.title },
      });
      if (!area) {
        console.warn(`Area with title "${areaData.title}" not found`);
        continue;
      }

      const personalEntities = areaData.workers.map((worker: any) => {
        const personal = new Personal();
        personal.nombre = worker.name;
        personal.apellido = worker.lastname;
        personal.telefono = worker.phone || null;
        personal.email = worker.email || null;
        personal.posicion = worker.position || null;
        personal.area = area;
        personal.estado = true; // Asumiendo que todos están activos por defecto
        return personal;
      });

      await cn.manager.save(personalEntities);
    }
  }
}

export default new PersonalTableSeeder();
