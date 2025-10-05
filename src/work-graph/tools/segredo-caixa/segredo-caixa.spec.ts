import { Test, TestingModule } from '@nestjs/testing';
import { SegredoCaixa } from './segredo-caixa';

describe('SegredoCaixa', () => {
  let provider: SegredoCaixa;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SegredoCaixa],
    }).compile();

    provider = module.get<SegredoCaixa>(SegredoCaixa);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
