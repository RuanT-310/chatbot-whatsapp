import { Module } from '@nestjs/common';
import { WorkGraphService } from './work-graph.service';
import { WorkGraphController } from './work-graph.controller';
import { LlmGeminiGogle } from './lmm/llm-gemini-gogle/llm-gemini-gogle';
import { LlmOpenIa } from './lmm/llm-open-ia/llm-open-ia';
import { GraphsModule } from './graphs/graphs.module';
import { AnswerQuestionGraph } from './graphs/answer-question-graph/answer-question-graph';
import { ToolsModule } from './tools/tools.module';

@Module({
  controllers: [WorkGraphController],
  providers: [WorkGraphService, LlmGeminiGogle, LlmOpenIa, AnswerQuestionGraph],
  exports: [WorkGraphService],
  imports: [GraphsModule, ToolsModule],
})
export class WorkGraphModule {}
