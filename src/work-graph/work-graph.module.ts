import { Module } from '@nestjs/common';
import { WorkGraphService } from './work-graph.service';
import { WorkGraphController } from './work-graph.controller';
import { GraphsModule } from './graphs/graphs.module';
import { AnswerQuestionGraph } from './graphs/answer-question-graph/answer-question-graph';
import { ToolsModule } from './tools/tools.module';

@Module({
  imports: [GraphsModule, ToolsModule],
  controllers: [WorkGraphController],
  providers: [WorkGraphService, AnswerQuestionGraph],
  exports: [WorkGraphService],
})
export class WorkGraphModule {}
