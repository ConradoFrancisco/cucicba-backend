import { DataSource } from "typeorm";

import { AutoridadEtica } from "../../entity/institucional/AutoridadEtica";
import { AutoridadRevisora } from "../../entity/institucional/AutoridadRevisadora";

class AutoridadRevisoraSeeder {
  public async run(cn: DataSource = null) {
    const autoridadRepository = cn.getRepository(AutoridadRevisora);
    if (cn.driver.options.type === "sqlite") {
      await cn.manager.query("DELETE FROM autoridad_revisora;");
    } else {
      await cn.manager.query(
        "TRUNCATE TABLE public.autoridad_revisora RESTART IDENTITY CASCADE;"
      );
    }
    const titulares = [
      { nombre: "Osvaldo Alberto", apellido: "Distefano" },
      { nombre: "Mónica Gabriela", apellido: "Jabie" },
      { nombre: "Emiliano Oscar", apellido: "Bellino Bat" },
    ];
    let ordenTitular :number = 1;
    for (const titular of titulares) {
      const autoridad = new AutoridadRevisora();
      autoridad.nombre = titular.nombre;
      autoridad.apellido = titular.apellido;
      autoridad.titular = true;
      autoridad.estado = true;
      autoridad.orden = ordenTitular
      await autoridadRepository.save(autoridad);
      ordenTitular++
    }

    const suplentes = [
      { nombre: "Noemí", apellido: "Saavedra" },
      { nombre: "Armando", apellido: "Caputo" },
      { nombre: "Jacqueline Adriana", apellido: "Amabile" },
    ];
    let ordenSuplente:number = 1;

    for (const suplente of suplentes) {
      const autoridad = new AutoridadRevisora();
      autoridad.nombre = suplente.nombre;
      autoridad.apellido = suplente.apellido;
      autoridad.titular = false;
      autoridad.estado = true;
      autoridad.orden = ordenSuplente;
      await autoridadRepository.save(autoridad);
      ordenSuplente++
    }
  }
}

export default new AutoridadRevisoraSeeder();
