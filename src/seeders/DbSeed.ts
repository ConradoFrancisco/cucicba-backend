import { DataSource } from "typeorm";
import AreaTableSeeder from "./AreaTableSeeder";
import TipoPersonaTableSeeder from "./TipoPersonaTableSeeder";
import InfractorTableSeeder from "./InfractorTableSeeder";
import IlegalesTableSeeder from "./IlegalesTableSeeder";
import PreguntasFrecuentesCategoriasTableSeeder from "./PreguntasFrecuentesCategoriasTableSeeder";
import PreguntasFrecuentesTableSeeder from "./PreguntasFrecuentesTableSeeder";
import CategoriaSancionSeeder from "./CategoriaSancionSeeder";
import SancionSeeder from "./SancionSeeder";
import CategoriaBibliotecaSeeder from "./CategoriaBibliotecaSeeder";
import NoticiaSeeder from "./NoticiaSeeder";

class DbSeed {
  constructor() {
    // code here...
  }

  public async run(cn: DataSource) {
    await NoticiaSeeder.run(cn);
    await PreguntasFrecuentesCategoriasTableSeeder.run(cn);
    await PreguntasFrecuentesTableSeeder.run(cn);
    await AreaTableSeeder.run(cn);
    await TipoPersonaTableSeeder.run(cn);
    await InfractorTableSeeder.run(cn);
    await IlegalesTableSeeder.run(cn);
    //sanciones
    await CategoriaSancionSeeder.run(cn);
    await SancionSeeder.run(cn);
    // Posts Biblioteca
    await CategoriaBibliotecaSeeder.run(cn);
  }
}

export default new DbSeed();
