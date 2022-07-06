import { Product } from './Product';
import { BaseEntity, Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from './Order';

@Entity()
export class ProductOrder extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    orderId: number;

    @Column()
    productId: number;

    @Column()
    quantity: number;

    @OneToMany(() => Product, product => product.id)
    @JoinTable()
    products: Product[];

    @OneToMany(() => Order, order => order.id)
    @JoinTable()
    order: Order;

    @Column()
    secretUser: string;

    @Column()
    deliveryDate: Date;

    @Column()
    note: string;

    @Column()
    address: string;
}