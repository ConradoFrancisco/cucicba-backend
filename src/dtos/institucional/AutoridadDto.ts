import { Area } from "../../entity/Area";
import { AutoridadPrincipal } from "../../entity/institucional/AutoridadPrincipal";
import { Cargo } from "../../entity/institucional/Cargo";
import { Personal } from "../../entity/institucional/Personal";

export class AutoridadDto {
  id?: number;
  nombre: string;
  apellido: string;
  estado?: boolean;
  orden?: number;
  cargoid?: number;
  foto: string;
  cargo?: Cargo;
  puesto?: string;
  periodoId: number;

  constructor(autoridad: any, get?: boolean) {
    console.log(autoridad);
    this.id = autoridad.id ? parseInt(autoridad.id.toString()) : null;
    (this.periodoId = autoridad.periodo),
      (this.nombre = autoridad.nombre),
      (this.foto = autoridad.foto),
      (this.apellido = autoridad.apellido),
      (this.estado = autoridad.estado !== null ? autoridad.estado : null),
      (this.orden = autoridad.orden
        ? parseInt(autoridad.orden.toString())
        : null),
      (this.cargoid = autoridad.cargoid ? autoridad.cargoid : null),
      (this.cargo = autoridad.cargo);
    this.puesto = autoridad.cargo ? autoridad.cargo.nombre : null;
  }
}
