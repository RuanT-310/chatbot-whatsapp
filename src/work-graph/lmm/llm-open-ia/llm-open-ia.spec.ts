import { Test, TestingModule } from '@nestjs/testing';
import { LlmOpenIa } from './llm-open-ia';

describe('LlmOpenIa', () => {
  let provider: LlmOpenIa;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LlmOpenIa],
    }).compile();

    provider = module.get<LlmOpenIa>(LlmOpenIa);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
