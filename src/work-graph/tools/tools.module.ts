import { Module } from '@nestjs/common';
import { SegredoCaixa } from './segredo-caixa/segredo-caixa';
import { RentalModule } from './rental/rental.module';

//tool define name for user
//tool verify stock of product
//tool for define a order
//tool for exclude a order
//tool for update a order

//product - stocks - order 
@Module({
  imports: [RentalModule],
  providers: [SegredoCaixa],
  exports: [SegredoCaixa, RentalModule],
})
export class ToolsModule {}
