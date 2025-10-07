import { Test, TestingModule } from '@nestjs/testing';
import { RentalSearch } from './rental-search';

describe('RentalSearch', () => {
  let provider: RentalSearch;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentalSearch],
    }).compile();

    provider = module.get<RentalSearch>(RentalSearch);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
