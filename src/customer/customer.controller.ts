import { Controller, Get, Post, Body, Param, Render, Redirect, ParseIntPipe, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @Render('customer/index')
  async findAll() {
    const customers = await this.customerService.findAll();
    return { 
      customers, 
      layout: 'layout', 
      title: 'Gestão de Clientes' 
    };
  }

  @Get(':id')
  @Render('customer/detail')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const customer = await this.customerService.findOne(id);
    console.log(customer);
    return { 
      customer, 
    };
  }

  @Post('create')
  @Redirect('/customer')
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    await this.customerService.create(createCustomerDto);
  }

  @Post('delete/:id')
  @Redirect('/customer')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.customerService.remove(id);
  }
}