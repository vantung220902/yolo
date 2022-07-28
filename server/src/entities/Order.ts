import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProductOrder } from "./ProductOrder";
import { User } from "./User";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId: number;

  @OneToOne(() => User, (user) => user.id)
  @JoinTable()
  user: User;

  @OneToMany(() => ProductOrder, (productOrder) => productOrder.order)
  @JoinColumn({ name: "id", referencedColumnName: "orderId" })
  productOrder: ProductOrder;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
