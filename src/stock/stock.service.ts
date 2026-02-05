import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';
import { MoreThan, Raw, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
  ) {}
  create(createStockDto: CreateStockDto) {
    return this.stockRepository.save(createStockDto);
  }

  findAll() {
    return this.stockRepository.find({ relations: ['product'] });
  }

  findOne(id: number) {
    return this.stockRepository.findOneBy({ id });
  }

  findStocksAvailable() {
    const today = new Date().toISOString().split('T')[0];

    return this.stockRepository.find({
      where: { 
        // 1. Lote dentro da validade (YYYY-MM-DD)
        expirationDate: Raw(alias => `${alias} >= :today`, { today }),
        
        // 2. Disponibilidade Real: Qtd física (inteira) menos Reservas (pode ser decimal)
        // Se quantity é 5 e reserved é 4.5, ainda existe 0.5 disponível para o Bot vender
        quantity: Raw(alias => `${alias} > reservedQuantity`)
      },
      relations: ['product'],
      order: {
        expirationDate: 'ASC' // FEFO: O que vence antes sai antes
      }
    });
  }

  async update(id: number, updateStockDto: UpdateStockDto) {
  // 1. Buscamos o registro atual
  const stock = await this.stockRepository.findOneBy({ id });
  
  if (!stock) {
    throw new NotFoundException('Lote de estoque não encontrado');
  }

  // 2. Mesclamos os dados. 
  // Note que não passamos 'productId' diretamente, mas sim o objeto product
  const updatedStock = {
    ...stock,
    ...updateStockDto,
    quantity: Number(updateStockDto.quantity), // Garantindo tipo para o SQLite
    product: { id: Number(updateStockDto.productId) } // O TypeORM entende isso como a FK
  };

  // 3. O save() identifica o ID e faz o UPDATE corretamente
  return await this.stockRepository.save(updatedStock);
}

  remove(id: number) {
    return this.stockRepository.delete(id);
  }
}
