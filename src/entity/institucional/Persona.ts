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
  TableInheritance,
} from "typeorm";

@Entity({ name: "persona" })
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class Persona {
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
