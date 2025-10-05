import { Module } from '@nestjs/common';
import { AnswerQuestionGraph } from './answer-question-graph/answer-question-graph';
import { LlmGeminiGogle } from '../lmm/llm-gemini-gogle/llm-gemini-gogle';

@Module({
  providers: [
    AnswerQuestionGraph,
    {
        provide: 'LLmProvider',
        useClass: LlmGeminiGogle,
    }
]

})
export class GraphsModule {

}
