import { DataSource } from "typeorm";
import { CategoriaSancion } from "../entity/servicios/Categoria_sancion";

class CategoriaSancionSeeder {
  public async run(cn: DataSource = null) {
    if (cn.driver.options.type === "sqlite")
      await cn.manager.query("DELETE FROM categoria_sancion;");
    else
      await cn.manager.query(
        "TRUNCATE TABLE public.categoria_sancion RESTART IDENTITY CASCADE;"
      );

    const categoria1 = new CategoriaSancion();
    categoria1.nombre = "Apercibimientos públicos";
    const categoria2 = new CategoriaSancion();
    categoria2.nombre = "Aplicación de multas";
    const categoria3 = new CategoriaSancion();
    categoria3.nombre = "Cancelación de matricula";
    const categoria4 = new CategoriaSancion();
    categoria4.nombre = "Suspensión de multas";

    await cn.manager.save([categoria1, categoria2, categoria3, categoria4]);
  }
}

export default new CategoriaSancionSeeder();
