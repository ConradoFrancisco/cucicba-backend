import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Persona } from "./Persona";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, Max, Min } from "class-validator";

@Entity({ name: "area" })
export class Area {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Min(2)
  @Max(255)
  nombre: string;

  @Column()
  @IsNotEmpty()
  @Min(2)
  @Max(255)
  descripcion: string;

  @Column({ default: true })
  @IsBoolean()
  estado: boolean;

  @Column({ nullable: true })
  @IsNumber()
  orden?: number;

  @ManyToOne(() => Persona, (persona) => persona.area)
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
