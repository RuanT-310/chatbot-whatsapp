import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Redirect, ParseIntPipe } from '@nestjs/common';
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

  @Get('edit/:id')
@Render('stock/edit')
async editPage(@Param('id', ParseIntPipe) id: number) {
  const stock = await this.stockService.findOne(id);
  const products = await this.productService.findAll(); // Para permitir trocar o produto se necessário
  return { 
    stock, 
    products, 
  };
}

@Post('update/:id')
@Redirect('/stock')
async update(@Param('id', ParseIntPipe) id: number, @Body() updateStockDto: any) {
  // Garantindo conversão de tipos para o SQLite
  const formattedData = {
    ...updateStockDto,
    quantity: Number(updateStockDto.quantity),
    productId: Number(updateStockDto.productId)
  };
  await this.stockService.update(id, formattedData);
}
}
