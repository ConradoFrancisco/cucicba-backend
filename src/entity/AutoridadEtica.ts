import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

import { IsBoolean, IsDate } from "class-validator";
import { Persona } from "./Persona";

@Entity({ name: "autoridad_etica" })
export class AutoridadEtica extends Persona {
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
