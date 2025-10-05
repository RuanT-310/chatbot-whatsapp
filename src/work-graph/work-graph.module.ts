import { Module } from '@nestjs/common';
import { WorkGraphService } from './work-graph.service';
import { WorkGraphController } from './work-graph.controller';
import { GraphsModule } from './graphs/graphs.module';
import { AnswerQuestionGraph } from './graphs/answer-question-graph/answer-question-graph';
import { ToolsModule } from './tools/tools.module';

@Module({
  controllers: [WorkGraphController],
  providers: [WorkGraphService, AnswerQuestionGraph],
  exports: [WorkGraphService],
  imports: [GraphsModule, ToolsModule],
})
export class WorkGraphModule {}
