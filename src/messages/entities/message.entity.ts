import { Customer } from "src/customer/entities/customer.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    body: string;

    @Column('datetime')
    timestamp: string;

    @OneToOne(() => Message, (message) => message.ref, { nullable: true })
    @JoinColumn()
    ref: Message;

    @ManyToOne(() => Customer, (customer) => customer.messages,  { nullable: true })
    customer: Customer
}   