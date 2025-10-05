import { Module } from '@nestjs/common';
import { WahaService } from './waha.service';
import { WahaController } from './waha.controller';
import { HttpModule } from '@nestjs/axios';
import { WorkGraphModule } from 'src/work-graph/work-graph.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    WorkGraphModule
  ],
  controllers: [WahaController],
  providers: [WahaService],
})
export class WahaModule {}
