import { Module } from '@nestjs/common';
import { SegredoCaixa } from './segredo-caixa/segredo-caixa';
import { RentalModule } from './rental/rental.module';

@Module({
  imports: [RentalModule],
  providers: [SegredoCaixa],
  exports: [SegredoCaixa],
})
export class ToolsModule {}
