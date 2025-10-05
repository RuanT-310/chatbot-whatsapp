import { Module } from '@nestjs/common';
import { WahaService } from './waha.service';
import { WahaController } from './waha.controller';

@Module({
  controllers: [WahaController],
  providers: [WahaService],
})
export class WahaModule {}
