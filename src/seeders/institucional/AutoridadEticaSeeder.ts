import { DataSource } from "typeorm";
import { Cargo } from "../../entity/institucional/Cargo";
import { AutoridadPrincipal } from "../../entity/institucional/AutoridadPrincipal";
import { AutoridadEtica } from "../../entity/institucional/AutoridadEtica";

class AutoridadEticaSeeder {
  public async run(cn: DataSource = null) {
    const autoridadRepository = cn.getRepository(AutoridadEtica);
    if (cn.driver.options.type === "sqlite") {
      await cn.manager.query("DELETE FROM autoridad_etica;");
    } else {
      await cn.manager.query(
        "TRUNCATE TABLE public.autoridad_etica RESTART IDENTITY CASCADE;"
      );
    }
    const titulares = [
      { nombre: "Roberto Nicolás", apellido: "Arevalo" },
      { nombre: "Rosana Maria A.", apellido: "Ruiz Anduaga" },
      { nombre: "Jorge Alberto", apellido: "La Torre" },
      { nombre: "Nora Amelia", apellido: "Ghezzi" },
      { nombre: "Fortunato José", apellido: "Suppa" },
    ];
    for (const titular of titulares) {
      const autoridad = new AutoridadEtica();
      autoridad.nombre = titular.nombre;
      autoridad.apellido = titular.apellido;
      autoridad.titular = true;
      autoridad.estado = true;

      await autoridadRepository.save(autoridad);
    }

    const suplentes = [
      { nombre: "María Cruz", apellido: "Casares" },
      { nombre: "Diego Ruben", apellido: "Armua" },
      { nombre: "Haydee M.", apellido: "La Rosa" },
      { nombre: "José Daniel", apellido: "Becerra" },
      { nombre: "Irma Mabel", apellido: "Fernandez" },
    ];
    for (const suplente of suplentes) {
      const autoridad = new AutoridadEtica();
      autoridad.nombre = suplente.nombre;
      autoridad.apellido = suplente.apellido;
      autoridad.titular = false;
      autoridad.estado = true;

      await autoridadRepository.save(autoridad);
    }
  }
}

export default new AutoridadEticaSeeder();
