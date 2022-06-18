import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    username!: string;

    @Column({ unique: true })
    email!: string;

    @OneToMany(() => Product, product => product.user)
    product:Product[]    

    @Column()
    password!: string;

    @Column({ nullable: true })
    avatar: string;

    @Column({ default: 0 })
    tokenVersion: number;


}