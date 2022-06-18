import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./Category";
import { User } from "./User";

@Entity()
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userId!: number;

    @Column()
    categoryId!: number

    @ManyToOne(() => User, user => user.product)
    user: User

    @Column()
    title!: string;

    @Column()
    price!: number;

    @Column()
    description!: string;

    @Column()
    color!: string;

    @ManyToOne(() => Category, category => category.product)
    category: Category;

    @Column()
    image!: string;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
}