import { IsDate } from "class-validator";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Persona } from "./Persona";

@Entity({ name: "tipo_persona" })
export class TipoPersona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @OneToMany(() => Persona, (persona) => persona.tipoPersona)
  personas: Persona[];

  @CreateDateColumn({ name: "created_at" })
  @IsDate()
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @IsDate()
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  @IsDate()
  deletedAt!: Date;
}
