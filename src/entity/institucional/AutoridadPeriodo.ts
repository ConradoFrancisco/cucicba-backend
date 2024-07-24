import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AutoridadPrincipal } from "./AutoridadPrincipal";

@Entity()
export class Periodo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  fechaInicio: Date;

  @Column()
  fechaFin: Date;

  @OneToMany(() => AutoridadPrincipal, (autoridad) => autoridad.periodo)
  autoridades: AutoridadPrincipal[];
}
