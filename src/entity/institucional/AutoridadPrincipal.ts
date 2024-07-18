import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { Persona } from "./Persona";
import { Cargo } from "./Cargo";
import { IsDate, IsNotEmpty, Max, Min } from "class-validator";

@Entity({ name: "autoridad_principal" })
export class AutoridadPrincipal extends Persona {
  @ManyToOne(() => Cargo, (cargo) => cargo.autoridades)
  cargo: Cargo;

  @Column()
  @IsNotEmpty()
  @Min(2)
  @Max(255)
  foto: string;

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
