
import { Message } from 'src/messages/entities/message.entity';
import { Order } from 'src/order/entities/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column('text')
  number: string;

  @OneToMany(() => Message, (message) => message.customer)
  messages: Message[];

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
