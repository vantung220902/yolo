import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    title!: string;

    @OneToMany(() => Product, product => product.category)
    product: Product[]
}