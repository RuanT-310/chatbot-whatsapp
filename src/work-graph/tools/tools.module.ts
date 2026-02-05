import { Module } from '@nestjs/common';

import { OrderToolModule } from './order/order-tool.module';

//tool define name for user
//tool verify stock of product
//tool for define a order
//tool for exclude a order
//tool for update a order

//product - stocks - order 
@Module({
  imports: [OrderToolModule],
  exports: [OrderToolModule],
})
export class ToolsModule {}
