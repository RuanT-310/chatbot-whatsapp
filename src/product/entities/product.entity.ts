import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column("text")
    name: string;
    @Column("text")
    price: number;
    @Column("text")
    description: string;
}
