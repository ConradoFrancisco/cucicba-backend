import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsBoolean, IsDate, IsNotEmpty, Max, Min } from "class-validator";

@Entity({ name: "infractor" })
export class Infractor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Min(2)
  @Max(255)
  nombre: string;

  @Column()
  @IsDate()
  fecha: Date;

  @Column()
  @IsNotEmpty()
  @Min(2)
  @Max(255)
  direccion: string;

  @Column({ default: false })
  @IsBoolean()
  estado: boolean;

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
