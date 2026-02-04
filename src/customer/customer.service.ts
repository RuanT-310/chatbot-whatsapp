import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) 
    private customerRepository: Repository<Customer>
  ) {}
  create(createCustomerDto: CreateCustomerDto) {
    return this.customerRepository.save(createCustomerDto);
  }

  findAll() {
    return this.customerRepository.find();
  }

  findOne(id: number) {
    return this.customerRepository.findOne({
      where: {id}, 
      relations: ['messages', "orders", "orders.items", "orders.items.stock", "orders.items.stock.product"],
      select: {
        id: true, 
        name: true, 
        number: true, 
        messages: {
          id: true, body: true, timestamp: true, ref: true
        }, 
        orders: true
      }
    });
  }

  findByNumber(number: string) {
    return this.customerRepository.findOne({
      where: {number}, 
      select: {id: true, name: true, number: true}
    });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.customerRepository.update(id, updateCustomerDto);
  }

  remove(id: number) {
    return this.customerRepository.delete(id);
  }
}
