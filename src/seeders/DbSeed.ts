import { DataSource } from "typeorm";
import AreaTableSeeder from "./AreaTableSeeder";
import TipoPersonaTableSeeder from "./TipoPersonaTableSeeder";
import InfractorTableSeeder from "./InfractorTableSeeder";
import IlegalesTableSeeder from "./IlegalesTableSeeder";

class DbSeed {
  constructor() {
    // code here...
  }

  public async run(cn: DataSource) {
    await AreaTableSeeder.run(cn);
    await TipoPersonaTableSeeder.run(cn);
    await InfractorTableSeeder.run(cn);
    await IlegalesTableSeeder.run(cn);
  }
}

export default new DbSeed();
