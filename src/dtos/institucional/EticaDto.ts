import { AutoridadEtica } from "../../entity/institucional/AutoridadEtica";

export class EticaDto {
  id?: number;
  nombre: string;
  apellido: string;
  cargo: string;
  titular: boolean;
  estado?: boolean;
  orden?: number;

  constructor(autoridad: AutoridadEtica) {
    this.id = autoridad.id ? parseInt(autoridad.id.toString()) : null;
    this.nombre = autoridad.nombre;
    this.apellido = autoridad.apellido;
    this.cargo = autoridad.titular ? "Titular" : "Suplente";
    this.orden = autoridad.orden ? autoridad.orden : null
    this.titular = autoridad.titular;
    this.estado = autoridad.estado !== null ? autoridad.estado : null;
  }
}
