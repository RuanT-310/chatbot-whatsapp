import { Test, TestingModule } from '@nestjs/testing';
import { LlmGeminiGogle } from './llm-gemini-gogle';

describe('LlmGeminiGogle', () => {
  let provider: LlmGeminiGogle;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LlmGeminiGogle],
    }).compile();

    provider = module.get<LlmGeminiGogle>(LlmGeminiGogle);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
