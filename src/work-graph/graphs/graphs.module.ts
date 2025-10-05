import { Module } from '@nestjs/common';
import { AnswerQuestionGraph } from './answer-question-graph/answer-question-graph';
import { LlmGeminiGogle } from '../lmm/llm-gemini-gogle/llm-gemini-gogle';
import { ToolsModule } from '../tools/tools.module';
import { LLmProvider } from '../lmm/llm-provider';
import { ConfigModule } from 'src/config/config.module';

@Module({
    imports: [ConfigModule, ToolsModule],
    providers: [
        AnswerQuestionGraph,
        {
            provide: LLmProvider,
            useClass: LlmGeminiGogle,
        }
    ],
    exports: [
        AnswerQuestionGraph,
        {
            provide: LLmProvider,
            useClass: LlmGeminiGogle,
        }
    ],
})
export class GraphsModule {}
