import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Order } from 'src/order/entities/order.entity';
import { de } from 'zod/v4/locales';
import { OrderItem } from 'src/order/entities/order-item.entity';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('integer')
  quantity: number;
  
  @Column('float', { precision: 10, scale: 2, default: 0.0 })
  reservedQuantity: number;

  @Column('date') // Data de validade do lote
  expirationDate: string;

  @Column('text', { nullable: true })
  batchNumber: string; // Identificador do lote (ex: "FORNADA_01")

  @Column('text', { nullable: true })
  observation: string;

  @ManyToOne(() => Product, (product) => product.stocks, { onDelete: 'CASCADE' })
  product: Product;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.stock, { onDelete: 'CASCADE' })
  orders: OrderItem[];
}