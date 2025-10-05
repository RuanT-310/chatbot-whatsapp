import { Test, TestingModule } from '@nestjs/testing';
import { AnswerQuestionGraph } from './answer-question-graph';

describe('AnswerQuestionGraph', () => {
  let provider: AnswerQuestionGraph;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerQuestionGraph],
    }).compile();

    provider = module.get<AnswerQuestionGraph>(AnswerQuestionGraph);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
