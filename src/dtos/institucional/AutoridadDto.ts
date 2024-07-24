import { Area } from "../../entity/Area";

import { Cargo } from "../../entity/Cargo";


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
