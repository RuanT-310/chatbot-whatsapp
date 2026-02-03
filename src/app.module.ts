import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { WorkGraphModule } from './work-graph/work-graph.module';
import { WahaModule } from './waha/waha.module';
import { CustomerModule } from './customer/customer.module';
import { DatabaseModule } from './database/database.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [WahaModule, WorkGraphModule, ConfigModule, CustomerModule, DatabaseModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
