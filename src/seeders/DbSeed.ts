import { DataSource } from "typeorm";
import AreaTableSeeder from "./AreaTableSeeder";
import TipoPersonaTableSeeder from "./TipoPersonaTableSeeder";
import InfractorTableSeeder from "./InfractorTableSeeder";
import IlegalesTableSeeder from "./IlegalesTableSeeder";
import PreguntasFrecuentesCategoriasTableSeeder from "./PreguntasFrecuentesCategoriasTableSeeder";
import PreguntasFrecuentesTableSeeder from "./PreguntasFrecuentesTableSeeder";

class DbSeed {
  constructor() {
    // code here...
  }

  public async run(cn: DataSource) {
    await PreguntasFrecuentesCategoriasTableSeeder.run(cn);
    await PreguntasFrecuentesTableSeeder.run(cn)
    await AreaTableSeeder.run(cn);
    await TipoPersonaTableSeeder.run(cn);
    await InfractorTableSeeder.run(cn);
    await IlegalesTableSeeder.run(cn);
  }
}

export default new DbSeed();
