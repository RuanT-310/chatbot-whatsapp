import { Test, TestingModule } from '@nestjs/testing';
import { RentalCreate } from './rental-create';

describe('RentalCreate', () => {
  let provider: RentalCreate;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentalCreate],
    }).compile();

    provider = module.get<RentalCreate>(RentalCreate);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
