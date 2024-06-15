import {
  IsBoolean,
  IsNotEmpty,
  IsDate,
  IsPositive,
  IsNumber,
  Max,
  Min,
} from "class-validator";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from "typeorm";
import { Area } from "./Area";

@Entity({ name: "persona" })
export class Persona {
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
  apellido: string;

  @Column({ default: false })
  @IsBoolean()
  estado: boolean;

  @Column({ nullable: true })
  @IsNumber()
  @IsPositive()
  orden?: number;

  @Column({ nullable: true })
  @Min(2)
  @Max(255)
  avatar?: string;

  @Column({ nullable: true })
  @Min(2)
  @Max(255)
  posicion?: string;

  @ManyToOne(() => Area, (area) => area.personas)
  area?: Area;

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
