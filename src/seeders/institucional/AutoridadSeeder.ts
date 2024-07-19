import { DataSource } from "typeorm";
import { Cargo } from "../../entity/institucional/Cargo";
import { AutoridadPrincipal } from "../../entity/institucional/AutoridadPrincipal";

class AutoridadSeeder {
  public async run(cn: DataSource = null) {
    const cargos = await cn.getRepository(Cargo).find();
    const cargoMap = new Map(cargos.map((cargo) => [cargo.nombre, cargo.id]));

    const data = [
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
        picture: "uploads/file-1716726487493-865216914.jpg",
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
    ];

    if (cn.driver.options.type === "sqlite") {
      await cn.manager.query("DELETE FROM autoridad_principal;");
    } else {
      await cn.manager.query(
        "TRUNCATE TABLE public.autoridad_principal RESTART IDENTITY CASCADE;"
      );
    }

    const autoridadRepository = cn.getRepository(AutoridadPrincipal);
    let orden: number = 1;
    for (const item of data) {
      const cargoId = cargoMap.get(item.position);
      if (cargoId) {
        const autoridad = new AutoridadPrincipal();
        autoridad.nombre = item.name;
        autoridad.estado = true;
        autoridad.apellido = item.lastName;
        autoridad.foto = item.picture;
        autoridad.cargo = { id: cargoId } as Cargo;
        autoridad.orden = orden;
        await autoridadRepository.save(autoridad);
      }
      orden++;
    }
  }
}

export default new AutoridadSeeder();
