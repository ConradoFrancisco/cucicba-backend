import { DataSource } from "typeorm";
import { Cargo } from "../../entity/institucional/Cargo";
import { AutoridadPrincipal } from "../../entity/institucional/AutoridadPrincipal";
import { Periodo } from "../../entity/institucional/AutoridadPeriodo";

class AutoridadSeeder {
  public async run(cn: DataSource = null) {
    const cargos = await cn.getRepository(Cargo).find();
    const cargoMap = new Map(cargos.map((cargo) => [cargo.nombre, cargo.id]));
    const periodos = await cn.getRepository(Periodo).find();
    const periodoMap = new Map(
      periodos.map((periodo) => [periodo.nombre, periodo.id])
    );

    const data = [
      [
        {
          name: "Diego Guillermo",
          lastName: "Frangella",
          picture: "uploads/file-1716838119018-346172579.jpg",
          position: "Presidente",
        },
        {
          name: "Nora",
          lastName: "Guerschanik",
          picture: "uploads/file-1716726354770-629062028.jpg",
          position: "Vicepresidente 1º",
        },
        {
          name: "Nélida",
          lastName: "Abdala",
          picture: "uploads/file-1716726381485-948061993.jpg",
          position: "Vicepresidente 2º",
        },
        {
          name: "Pablo",
          lastName: "Abbatangelo",
          picture: "uploads/file-1716726407237-592219563.jpg",
          position: "Secretario",
        },
        {
          name: "Héctor",
          lastName: "Menéndez",
          picture: "uploads/file-1716726433549-810714444.jpg",
          position: "Prosecretario",
        },
        {
          name: "Fernando",
          lastName: "Coluccio",
          picture: "uploads/file-1716726465278-583283878.jpg",
          position: "Tesorero",
        },
        {
          name: "Liliana",
          lastName: "Cingolani",
          picture: "uploads/file-1716726487493-865216914.jpg",
          position: "Protesorero",
        },
        {
          name: "Mónica",
          lastName: "Godoy",
          picture: "uploads/file-1716726524254-766581958.jpg",
          position: "Vocal Titular",
        },
        {
          name: "Alejandro",
          lastName: "Moretti",
          picture: "uploads/file-1716726556130-452115228.jpg",
          position: "Vocal Titular",
        },
        {
          name: "Cintia",
          lastName: "Bibbo",
          picture: "uploads/file-1716726593889-471854068.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Diego",
          lastName: "Freixas",
          picture: "uploads/file-1716726626904-546292126.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Andrea",
          lastName: "Varela",
          picture: "uploads/file-1716726647122-11894815.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Pablo",
          lastName: "Martín",
          picture: "uploads/file-1716726729472-854571619.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Astrid Espejo",
          lastName: "Sorensen",
          picture: "uploads/file-1716726747014-616031083.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Carlos",
          lastName: "Rodríguez",
          picture: "uploads/file-1716726784876-40940797.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Ana ",
          lastName: "Rodríguez",
          picture: "uploads/file-1716726811368-24317094.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Alejandro",
          lastName: "Braña",
          picture: "uploads/file-1716726831909-285805735.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Graciela",
          lastName: "Giani",
          picture: "uploads/file-1716726856895-886251888.jpg",
          position: "Vocal Suplente",
        },
      ],
      [
        {
          name: "Marta Susana",
          lastName: "Liotto",
          picture: "uploads/file-1.jpg",
          position: "Presidente",
        },
        {
          name: "Bielli",
          lastName: "Guillermo",
          picture: "uploads/2.jpg",
          position: "Vicepresidente 1º",
        },
        {
          name: "Nora",
          lastName: "Guerschanik",
          picture: "uploads/3.jpg",
          position: "Vicepresidente 2º",
        },
        {
          name: "Pablo",
          lastName: "Abbatangelo",
          picture: "uploads/4.jpg",
          position: "Secretario",
        },
        {
          name: "Fernando",
          lastName: "Coluccio",
          picture: "uploads/5.jpg",
          position: "Tesorero",
        },
        {
          name: "Nélida",
          lastName: "Abdala",
          picture: "uploads/6.jpg",
          position: "Vocal Titular",
        },
        {
          name: "Alejandro Juan",
          lastName: "Bennazar",
          picture: "uploads/7.jpg",
          position: "Vocal Titular",
        },
        {
          name: "Héctor",
          lastName: "Menendez",
          picture: "uploads/8.jpg",
          position: "Vocal Titular",
        },
        {
          name: "Eduardo",
          lastName: "Di Fini",
          picture: "uploads/9.jpg",
          position: "Vocal Titular",
        },
        {
          name: "Ana",
          lastName: "Rodriguez",
          picture: "uploads/10.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Pablo",
          lastName: "Martin",
          picture: "uploads/11.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Alejandro",
          lastName: "Moretti",
          picture: "uploads/12.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Ercilla",
          lastName: "Rodriguez Quiroga",
          picture: "uploads/13.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Martín",
          lastName: "Gonzalez",
          picture: "uploads/14.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Pablo",
          lastName: "Di Lernia",
          picture: "uploads/15.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Maria Del Carmen",
          lastName: "Linkoniene",
          picture: "uploads/16.jpg",
          position: "Vocal Suplente",
        },
      ],
      [
        {
          name: "Armando Pepe",
          lastName: "",
          picture: "uploads/a1.jpg",
          position: "Presidente",
        },
        {
          name: "Marta",
          lastName: "Liotto",
          picture: "uploads/a2.jpg",
          position: "Vicepresidente 1º",
        },
        {
          name: "Liliana",
          lastName: "Cingolani",
          picture: "uploads/a3.jpg",
          position: "Vicepresidente 2º",
        },
        {
          name: "Hernán",
          lastName: "Iradi",
          picture: "uploads/a5.jpg",
          position: "Secretario",
        },
        {
          name: "Diego Guillermo",
          lastName: "Frangella",
          picture: "uploads/a6.jpg",
          position: "Tesorero",
        },
        {
          name: "Mario",
          lastName: "Gómez",
          picture: "uploads/a7.jpg",
          position: "Protesorero",
        },
        {
          name: "Victoria",
          lastName: "Meilij",
          picture: "uploads/a8.jpg",
          position: "Prosecretario",
        },
        {
          name: "Mariano",
          lastName: "Oppel",
          picture: "uploads/a9.jpg",
          position: "SECRETARIO DE ACTAS",
        },
        {
          name: "Lucas",
          lastName: "Andereggen",
          picture: "uploads/a4.jpg",
          position: "Vocal Titular",
        },
        {
          name: "Víctor Hugo",
          lastName: "Cappuccio",
          picture: "uploads/a10.jpeg",
          position: "Vocal Suplente",
        },
        {
          name: "Fernando Luciano",
          lastName: "Coluccio",
          picture: "uploads/a11.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Nora Blanca",
          lastName: "Guerschanik",
          picture: "uploads/a13.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Gustavo Marcelo",
          lastName: "Ortola Martinez",
          picture: "uploads/a14.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Patricio Martin",
          lastName: "Bedetti",
          picture: "uploads/a15.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Mónica Isabel",
          lastName: "Godoy",
          picture: "uploads/a16.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Román Andrés",
          lastName: "Paikin",
          picture: "uploads/a17.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Adrián Marcelo",
          lastName: "Toledo",
          picture: "uploads/a18.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Adriana Marcela",
          lastName: "Burgos",
          picture: "uploads/a20.jpg",
          position: "Vocal Suplente",
        },
      ],
      [
        {
          name: "Armando Pepe",
          lastName: "",
          picture: "uploads/b-1.jpg",
          position: "Presidente",
        },
        {
          name: "Marta",
          lastName: "Liotto",
          picture: "uploads/b-2.jpg",
          position: "Vicepresidente 1º",
        },
        {
          name: "Liliana",
          lastName: "Cingolani",
          picture: "uploads/b-3.jpg",
          position: "Vicepresidente 2º",
        },
        {
          name: "Hernán",
          lastName: "Iradi",
          picture: "uploads/b-4.jpg",
          position: "Secretario",
        },
        {
          name: "Diego Guillermo",
          lastName: "Frangella",
          picture: "uploads/b-5.jpg",
          position: "Tesorero",
        },
        {
          name: "Mario",
          lastName: "Gómez",
          picture: "uploads/b-6.jpg",
          position: "Protesorero",
        },
        {
          name: "Victoria",
          lastName: "Meilij",
          picture: "uploads/b-7.jpg",
          position: "Prosecretario",
        },
        {
          name: "Gastón",
          lastName: "Sotelo",
          picture: "uploads/b-8.jpg",
          position: "SECRETARIO DE ACTAS",
        },
        {
          name: "Susana Di Dio",
          lastName: "Da Representacao",
          picture: "uploads/b-9.jpg",
          position: "Vocal Titular",
        },
        {
          name: "Gustavo",
          lastName: "M. Ortolá Martínez",
          picture: "uploads/b-10.jpeg",
          position: "Vocal Suplente",
        },
        {
          name: "Fernando Luciano",
          lastName: "Coluccio",
          picture: "uploads/b-11.jpeg",
          position: "Vocal Suplente",
        },
        {
          name: "Nora Blanca",
          lastName: "Guerschanik",
          picture: "uploads/b-13.jpeg",
          position: "Vocal Suplente",
        },
        {
          name: "Victor",
          lastName: "Cappuccio",
          picture: "uploads/b-14.jpeg",
          position: "Vocal Suplente",
        },
        {
          name: "Pablo",
          lastName: "Mansilla",
          picture: "uploads/b-15.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Alfredo",
          lastName: "Ricotti",
          picture: "uploads/b-16.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Pablo",
          lastName: "Abbatangelo",
          picture: "uploads/b-17.jpeg",
          position: "Vocal Suplente",
        },
      ],
      [
        {
          name: "Héctor",
          lastName: "D´Odorico",
          picture: "uploads/c-1.jpg",
          position: "Presidente",
        },
        {
          name: "Gabriela",
          lastName: "Goldszer",
          picture: "uploads/c-2.jpg",
          position: "Vicepresidente 1º",
        },
        {
          name: "Omart",
          lastName: "Porta",
          picture: "uploads/c-3.jpg",
          position: "Vicepresidente 2º",
        },
        {
          name: "Gastón",
          lastName: "Sotelo",
          picture: "uploads/c-4.jpg",
          position: "Secretario",
        },
        {
          name: "Héctor",
          lastName: "Corbalán",
          picture: "uploads/c-5.jpg",
          position: "Tesorero",
        },
        {
          name: "María Victoria",
          lastName: "Meilij",
          picture: "uploads/c-6.jpg",
          position: "Protesorero",
        },
        {
          name: "Héctor",
          lastName: "Menéndez",
          picture: "uploads/c-7.jpg",
          position: "Prosecretario",
        },
        {
          name: "Mario",
          lastName: "Gómez",
          picture: "uploads/c-8.jpg",
          position: "SECRETARIO DE ACTAS",
        },
        {
          name: "Marcelo Benjamín",
          lastName: "Goldstein",
          picture: "uploads/c-9.jpg",
          position: "Vocal Titular",
        },
        {
          name: "Eduardo",
          lastName: "Di Fini",
          picture: "uploads/c-10.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Susana Di Dio de",
          lastName: "Representaçao",
          picture: "uploads/c-11.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Martín Gabriel",
          lastName: "Boquete",
          picture: "uploads/c-12.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Néstor Alfredo",
          lastName: "Walenten",
          picture: "uploads/c-13.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Natalia",
          lastName: "Rucci",
          picture: "uploads/c-14.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Alfredo",
          lastName: "Ricotti",
          picture: "uploads/c-15.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Luciano",
          lastName: "Damico",
          picture: "uploads/c-16.jpg",
          position: "Vocal Suplente",
        },
        {
          name: "Claudio Salvado",
          lastName: "Anania",
          picture: "uploads/c-17.jpg",
          position: "Vocal Suplente",
        },
      ],
      [
        {
          name: "Héctor",
          lastName: "D´Odorico",
          picture: "uploads/d-1.jpg",
          position: "Presidente",
        },
        {
          name: "Martín",
          lastName: "Boquete",
          picture: "uploads/d-2.jpg",
          position: "Vicepresidente 1º",
        },
        {
          name: "Gabriela",
          lastName: "Goldszer",
          picture: "uploads/d-3.jpg",
          position: "Vicepresidente 2º",
        },
        {
          name: "Néstor",
          lastName: "Walenten",
          picture: "uploads/d-4.jpg",
          position: "Secretario",
        },
        {
          name: "Héctor",
          lastName: "Corbalán",
          picture: "uploads/d-5.jpg",
          position: "Tesorero",
        },
        {
          name: "Susana",
          lastName: "Spagnolo de Vincenti",
          picture: "uploads/d-6.jpg",
          position: "Protesorero",
        },
        {
          name: "Héctor",
          lastName: "Menéndez",
          picture: "uploads/d-7.jpg",
          position: "Prosecretario",
        },
        {
          name: "Marcelo",
          lastName: "Goldstein",
          picture: "uploads/d-8.jpg",
          position: "SECRETARIO DE ACTAS",
        },
        {
          name: "Mónica",
          lastName: "Godoy",
          picture: "uploads/d-9.jpg",
          position: "Vocal Titular",
        },
        {
          name: "Francisco Antonio",
          lastName: "Balsano",
          picture: "uploads/d-10.jpg",
          position: "Vocal Suplente 1º",
        },
        {
          name: "Ana Rosa",
          lastName: "Rodríguez",
          picture: "uploads/d-11.jpg",
          position: "Vocal Suplente 2º",
        },
        {
          name: "Eduardo",
          lastName: "Di Fini",
          picture: "uploads/d-12.jpg",
          position: "Vocal Suplente 3º",
        },
        {
          name: "Roberto Mario",
          lastName: "Gómez",
          picture: "uploads/d-13.jpg",
          position: "Vocal Suplente 4º",
        },
        {
          name: "Susana Di Dio de",
          lastName: "Representaçao",
          picture: "uploads/d-14.jpg",
          position: "Vocal Suplente 5º",
        },
        {
          name: "Omar Roque",
          lastName: "Porta",
          picture: "uploads/d-15.jpg",
          position: "Vocal Suplente 6º",
        },
        {
          name: "Claudio Salvador José",
          lastName: "Anania",
          picture: "uploads/d-16.jpg",
          position: "Vocal Suplente 7º",
        },
        {
          name: "Adrián",
          lastName: "Toledo",
          picture: "uploads/d-17.jpg",
          position: "Vocal Suplente 8º",
        },
        {
          name: "Nélida Elena",
          lastName: "Abdala",
          picture: "uploads/d-18.jpg",
          position: "Vocal Suplente 9º",
        },
      ],
    ];

    if (cn.driver.options.type === "sqlite") {
      await cn.manager.query("DELETE FROM autoridad_principal;");
    } else {
      await cn.manager.query(
        "TRUNCATE TABLE public.autoridad_principal RESTART IDENTITY CASCADE;"
      );
    }

    const autoridadRepository = cn.getRepository(AutoridadPrincipal);

    let periodo: number = 1;

    for (const autoridades of data) {
      let orden: number = 1;

      for (const item of autoridades) {
        const cargoId = cargoMap.get(item.position);

        if (cargoId) {
          const autoridad = new AutoridadPrincipal();
          autoridad.nombre = item.name;
          autoridad.estado = true;
          autoridad.apellido = item.lastName;
          autoridad.foto = item.picture;
          autoridad.cargo = { id: cargoId } as Cargo;
          autoridad.orden = orden;
          autoridad.periodo = { id: periodo } as Periodo;
          await autoridadRepository.save(autoridad);
        }
        orden++;
      }
      periodo++;
    }
  }
}

export default new AutoridadSeeder();
