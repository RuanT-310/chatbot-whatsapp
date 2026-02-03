import { Module } from '@nestjs/common';
import { WahaService } from './waha.service';
import { WahaController } from './waha.controller';
import { HttpModule } from '@nestjs/axios';
import { WorkGraphModule } from 'src/work-graph/work-graph.module';
import { CustomerModule } from 'src/customer/customer.module';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    WorkGraphModule,
    CustomerModule,
    MessagesModule
  ],
  controllers: [WahaController],
  providers: [WahaService],
})
export class WahaModule {}
