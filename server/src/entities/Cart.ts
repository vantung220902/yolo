import { Product } from './Product';
import { User } from './User';
import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    userId: number;

    @Column()
    productId: number;

    @OneToOne(()=>User,user=>user.id)
    user:User

    @OneToMany(() => Product, product => product.id)
    products:Product[]

    @Column()
    total: number;

    @Column()
    secretUser: string;


}