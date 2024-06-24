import { Infractor } from "../../entity/servicios/Infractor";

export class InfractorDto {
  id?: number;
  nombre: string;
  fecha: Date;
  estado: boolean;
  direccion: string;

  constructor(infractor: any) {
    this.id = infractor.id ? parseInt(infractor.id) : null;
    this.nombre = infractor.nombre;
    this.fecha = infractor.fecha;
    this.estado = infractor.estado;
    this.direccion = infractor.direccion;
  }
}
