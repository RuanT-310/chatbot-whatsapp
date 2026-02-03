import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Redirect } from '@nestjs/common';
import { StockService } from './stock.service';
import { ProductService } from 'src/product/product.service';

@Controller('stock')
export class StockController {
  constructor(
    private readonly stockService: StockService,
    private readonly productService: ProductService,
  ) {}

  @Get()
  @Render('stock/index')
  async listAll() {
    const stocks = await this.stockService.findAll();
    const products = await this.productService.findAll();
    return { stocks, products };
  }

  @Post('create')
  @Redirect('/stock')
  async create(@Body() createStockDto: any) {
    // Vincula o ID do produto ao objeto antes de salvar
    await this.stockService.create({
      ...createStockDto,
      product: { id: createStockDto.productId }
    });
  }
}
