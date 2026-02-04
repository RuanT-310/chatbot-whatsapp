import { Stock } from "src/stock/entities/stock.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  quantity: number;

  @Column('float')
  unitPrice: number; // Preço no momento da venda

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @ManyToOne(() => Stock, (stock) => stock.orders)
  stock: Stock; // Vincula ao lote específico (perecível)
}