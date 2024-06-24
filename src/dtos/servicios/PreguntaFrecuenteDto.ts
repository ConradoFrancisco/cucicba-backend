import { PreguntaFrecuente } from "../../entity/servicios/PreguntaFrecuente";

export class PreguntaFrecuenteDto {
    id?: number;
    pregunta: string;
    respuesta: string;
    estado: boolean;
    categoria: { id: number, nombre: string };
  
    constructor(preguntaFrecuente: PreguntaFrecuente) {
      this.id = preguntaFrecuente.id ? parseInt(preguntaFrecuente.id.toString()) : null;
      this.pregunta = preguntaFrecuente.pregunta;
      this.respuesta = preguntaFrecuente.respuesta;
      this.estado = preguntaFrecuente.estado;
      this.categoria = preguntaFrecuente.categoria ? { id: preguntaFrecuente.categoria.id, nombre: preguntaFrecuente.categoria.nombre } : null;
    }
}