import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
  } from "typeorm";
  import { PreguntaFrecuente } from "./PreguntaFrecuente";
import { IsNotEmpty, Max, Min } from "class-validator";
  
  @Entity({ name: "categorias_preguntas_frecuentes" })
  export class CategoriasPreguntasFrecuentes {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @IsNotEmpty()
    @Min(2)
    @Max(255)
    nombre: string;
  
    @OneToMany(() => PreguntaFrecuente, (preguntaFrecuente) => preguntaFrecuente.categoria)
    preguntasFrecuentes: PreguntaFrecuente[];
  }