import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('number')
  quantity: number;

  @Column('number')
  reserverdQuantity: number;

  @Column('date') // Data de validade do lote
  expirationDate: string;

  @Column('text', { nullable: true })
  batchNumber: string; // Identificador do lote (ex: "FORNADA_01")

  @Column('text', { nullable: true })
  observation: string;

  @ManyToOne(() => Product, (product) => product.stocks, { onDelete: 'CASCADE' })
  product: Product;
}