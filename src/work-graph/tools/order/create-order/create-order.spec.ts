import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrder } from './create-order';

describe('CreateOrder', () => {
  let provider: CreateOrder;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateOrder],
    }).compile();

    provider = module.get<CreateOrder>(CreateOrder);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
