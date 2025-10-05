import { Module } from '@nestjs/common';
import { SegredoCaixa } from './segredo-caixa/segredo-caixa';

@Module({
  providers: [SegredoCaixa],
  exports: [SegredoCaixa],
})
export class ToolsModule {}
