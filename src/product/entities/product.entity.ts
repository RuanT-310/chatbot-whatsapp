import { Stock } from "src/stock/entities/stock.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

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

    @OneToMany(() => Stock, (stock) => stock.product)
    stocks: Stock[]; // Um produto tem vários lotes em estoque
}
