import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { IsNotEmpty, Max, Min } from "class-validator";
import { Sancion } from "./Sancion";


@Entity({ name: "categoria_sancion" })
export class CategoriaSancion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Min(2)
  @Max(255)
  nombre: string;

  @OneToMany(() => Sancion, (sancion) => sancion.categoria)
  sanciones: Sancion[];
}
