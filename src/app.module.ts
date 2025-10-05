import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { WorkGraphModule } from './work-graph/work-graph.module';
import { WahaModule } from './waha/waha.module';

@Module({
  imports: [WahaModule, WorkGraphModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
