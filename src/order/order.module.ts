import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { CustomerModule } from 'src/customer/customer.module';
import { StockModule } from 'src/stock/stock.module';
import { OrderItem } from './entities/order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem]), StockModule, CustomerModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
