import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsBoolean, IsDate, IsNotEmpty, Max, Min } from "class-validator";

@Entity({ name: "revista" })
export class Revista {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Min(2)
  @Max(255)
  descripcion: string;
  @Column()
  @IsNotEmpty()
  @Min(2)
  @Max(255)
  archivo: string;
  @Column()
  @IsNotEmpty()
  @Min(2)
  @Max(255)
  imagen: string;

  @Column()
  @IsDate()
  fecha: Date;

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
