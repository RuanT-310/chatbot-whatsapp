import { Controller, Get, Post, Body, Param, Render, Redirect, ParseIntPipe, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { OrderService } from './order.service';
import { StockService } from '../stock/stock.service';
import { CustomerService } from '../customer/customer.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly stockService: StockService,
    private readonly customerService: CustomerService,
  ) {}

  @Get()
  @Render('order/index')
  async listAll() {
    const orders = await this.orderService.findAll();
    // Certifique-se que o stockService.findAll() traga a relação ['product']
    const stocks = await this.stockService.findAll(); 
    const customers = await this.customerService.findAll();
    
    return { 
      orders, 
      stocks, 
      customers,
    };
  }

  @Post('create')
  async createOrder(@Body() createOrderDto: any, @Res() res) {
    try {
      // Adequando os dados: garantindo que IDs e quantidades sejam numéricos
      const formattedOrder = {
        customerId: Number(createOrderDto.customerId),
        paymentMethod: createOrderDto.paymentMethod,
        items: createOrderDto.items.map(item => ({
          stockId: Number(item.stockId),
          quantity: Number(item.quantity) // Suporta o 0.5 (banda de frango)
        }))
      };

      await this.orderService.create(formattedOrder);
      
      // Como o envio é via AJAX (Fetch), retornamos um status de sucesso
      // O redirecionamento será feito pelo JavaScript no front-end
      return res.status(HttpStatus.CREATED).json({ message: 'Pedido criado com sucesso' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ 
        message: 'Erro ao criar pedido', 
        error: error.message 
      });
    }
  }

  @Post('pay/:id')
  @Redirect('/order')
  async markAsPaid(@Param('id', ParseIntPipe) id: number) {
    await this.orderService.markAsPaid(id);
  }

  @Post('confirm/:id')
  @Redirect('/order')
  async confirmDelivery(@Param('id', ParseIntPipe) id: number) {
    await this.orderService.confirmDelivery(id);
  }

  @Post('cancel/:id')
  @Redirect('/order')
  async cancelOrder(@Param('id', ParseIntPipe) id: number) {
    await this.orderService.cancel(id);
  }

  @Get('detail/:id')
  @Render('order/detail')
  async detail(@Param('id', ParseIntPipe) id: number) {
    const order = await this.orderService.findOneWithItems(id);
    if (!order) throw new NotFoundException('Pedido não encontrado');

    return { 
      order
    };
  }
}