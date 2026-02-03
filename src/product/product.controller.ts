import { Controller, Get, Post, Body, Param, Render, Redirect } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @Render('product/index')
  async listAll() {
    const products = await this.productService.findAll();
    return { products };
  }

  @Post('create')
  @Redirect('/product')
  async create(@Body() createProductDto: CreateProductDto) {
    await this.productService.create(createProductDto);
  }

  // Rota para abrir a página de edição
  @Get('edit/:id')
  @Render('product/edit')
  async editPage(@Param('id') id: number) {
    const product = await this.productService.findOne(id);
    return { product };
  }

  @Post('update/:id')
  @Redirect('/product')
  async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    await this.productService.update(id, updateProductDto);
  }

  @Post('delete/:id')
  @Redirect('/product')
  async remove(@Param('id') id: number) {
    await this.productService.remove(id);
  }
}