import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne, PrimaryGeneratedColumn
} from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

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

  @ManyToOne(() => Product, (product) => product.productOrder)
  @JoinColumn({ name: "productId", referencedColumnName: "id" })
  products: Product[];

  @ManyToOne(() => Order, (order) => order.productOrder, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
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
