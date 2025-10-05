import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WahaModule } from './waha/waha.module';
import { WorkGraphModule } from './work-graph/work-graph.module';
import { AgentModule } from './agent/agent.module';
import { WahaModule } from './waha/waha.module';

@Module({
  imports: [WahaModule, AgentModule, WorkGraphModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
