import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';
import { Repository } from 'typeorm/repository/Repository.js';
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

  update(id: number, updateStockDto: UpdateStockDto) {
    return this.stockRepository.update(id, updateStockDto);
  }

  remove(id: number) {
    return this.stockRepository.delete(id);
  }
}
