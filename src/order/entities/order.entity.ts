import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { Stock } from '../../stock/entities/stock.entity';
import { OrderItem } from './order-item.entity';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  DELIVERED = 'delivered',
}

export enum PaymentMethod {
  PIX = 'pix',
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  CASH = 'cash',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  REFUNDED = 'refunded',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({
        type: 'text',
        default: OrderStatus.PENDING,
    })
    status: OrderStatus;

    @Column({
        type: 'text',
        default: PaymentMethod.CASH,
    })
    paymentMethod: PaymentMethod;

    @Column({
        type: 'text',
        default: PaymentStatus.PENDING,
    })
    paymentStatus: PaymentStatus;

    @Column('decimal', { precision: 10, scale: 2 })
    totalPrice: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Customer, (customer) => customer.orders)
    customer: Customer;

    @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
    items: OrderItem[];

}