
import { Message } from 'src/messages/entities/message.entity';
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
}
