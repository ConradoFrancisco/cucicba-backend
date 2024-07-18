import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { Persona } from "./Persona";
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsDate,
} from "class-validator";
import { Area } from "../Area";

@Entity({ name: "personal" })
export class Personal extends Persona {
  @Column({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Column({ nullable: true })
  @IsPhoneNumber()
  @IsOptional()
  telefono?: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  posicion?: string;

  @ManyToOne(() => Area, (area) => area.personal)
  area: Area;

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
