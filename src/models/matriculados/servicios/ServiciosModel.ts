import Servicio from './Servicio'; // Asegúrate de ajustar la ruta según sea necesario

class ServiciosModel {
  public async getAll() {
    try {
      const data = await Servicio.findAll({
        where: {
          activo: true
        }
      });
      return data;
    } catch (e) {
      console.error('Error al obtener los servicios: ', e);
      throw new Error(
        "No se pudieron obtener los servicios, intente de nuevo más tarde"
      );
    }
  }
}

export default new ServiciosModel();