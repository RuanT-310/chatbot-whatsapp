import { Module } from '@nestjs/common';
import { AnswerQuestionGraph } from './answer-question-graph/answer-question-graph';
import { LlmOpenIa } from '../lmm/llm-open-ia/llm-open-ia';
import { ToolsModule } from '../tools/tools.module';
import { LLmProvider } from '../lmm/llm-provider';
import { ConfigModule } from 'src/config/config.module';

@Module({
    imports: [ConfigModule, ToolsModule],
    providers: [
        AnswerQuestionGraph,
        {
            provide: LLmProvider,
            useClass: LlmOpenIa,
        }
    ],
    exports: [
        AnswerQuestionGraph,
        {
            provide: LLmProvider,
            useClass: LlmOpenIa,
        }
    ],
})
export class GraphsModule {}
