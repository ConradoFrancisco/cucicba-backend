import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

import { IsBoolean, IsDate, IsNumber, IsPositive } from "class-validator";
import { Personal } from "./Personal";


@Entity({ name: "area" })
export class Area {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ default: false })
  @IsBoolean()
  estado: boolean;

  @Column({ nullable: true })
  @IsNumber()
  @IsPositive()
  orden?: number;

  @OneToMany(() => Personal, (personal) => personal.area)
  personal: Personal[];

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
