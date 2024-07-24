import { DataSource } from "typeorm";
import { Cargo } from "../../entity/Cargo";


class CargoSeeder {
    public async run(cn: DataSource = null) {
        if (cn.driver.options.type === "sqlite") {
            await cn.manager.query("DELETE FROM cargo;");
          } else {
            await cn.manager.query(
              "TRUNCATE TABLE public.cargo RESTART IDENTITY CASCADE;"
            );
          }
    const cargos = [
      "Presidente",
      "Vicepresidente 1º",
      "Vicepresidente 2º",
      "Secretario",
      "Prosecretario",
      "Tesorero",
      "Protesorero",
      "Vocal Titular",
      "Vocal Titular",
      "Vocal Suplente",
      "Vocal Suplente",
    ];

    for (const nombre of cargos) {
        const cargo = new Cargo();
        cargo.nombre = nombre;
        await cn.manager.save(cargo);
      }
  }
}
export default new CargoSeeder();