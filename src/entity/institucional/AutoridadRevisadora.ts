import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { Persona } from "./Persona";
import { IsBoolean, IsDate } from "class-validator";

@Entity({ name: "autoridad_revisora" })
export class AutoridadRevisora extends Persona {
  @Column({ default: false })
  @IsBoolean()
  titular: boolean;

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
