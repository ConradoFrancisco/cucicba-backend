import { DataSource } from "typeorm";
import AreaTableSeeder from "./AreaTableSeeder";
import InfractorTableSeeder from "./InfractorTableSeeder";
import IlegalesTableSeeder from "./IlegalesTableSeeder";
import PreguntasFrecuentesCategoriasTableSeeder from "./PreguntasFrecuentesCategoriasTableSeeder";
import PreguntasFrecuentesTableSeeder from "./PreguntasFrecuentesTableSeeder";
import CategoriaSancionSeeder from "./CategoriaSancionSeeder";
import SancionSeeder from "./SancionSeeder";
import CategoriaBibliotecaSeeder from "./CategoriaBibliotecaSeeder";
import NoticiaSeeder from "./NoticiaSeeder";
import BibliotecaSeeder from "./BibliotecaSeeder";
import ImagenNoticiaSeeder from "./ImagenNoticiaSeeder";
import PersonalSeeder from "./institucional/PersonalSeeder";

class DbSeed {
  constructor() {
    // code here...
  }

  public async run(cn: DataSource) {
    //institucional
    await AreaTableSeeder.run(cn);
    await PersonalSeeder.run(cn);
    //noticias
    await NoticiaSeeder.run(cn);
    await ImagenNoticiaSeeder.run(cn);
    //servicios
    await PreguntasFrecuentesCategoriasTableSeeder.run(cn);
    await PreguntasFrecuentesTableSeeder.run(cn);
    await InfractorTableSeeder.run(cn);
    await IlegalesTableSeeder.run(cn);
    //sanciones
    await CategoriaSancionSeeder.run(cn);
    await SancionSeeder.run(cn);
    // Posts Biblioteca
    await CategoriaBibliotecaSeeder.run(cn);
    await BibliotecaSeeder.run(cn);
  }
}

export default new DbSeed();
