import { Module } from '@nestjs/common';
import { CreateOrder } from './create-order/create-order';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [OrderModule],
  providers: [CreateOrder],
  exports: [CreateOrder],
})
export class OrderToolModule {}
