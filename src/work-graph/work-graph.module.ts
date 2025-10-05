import { Module } from '@nestjs/common';
import { WorkGraphService } from './work-graph.service';
import { WorkGraphController } from './work-graph.controller';

@Module({
  controllers: [WorkGraphController],
  providers: [WorkGraphService],
})
export class WorkGraphModule {}
