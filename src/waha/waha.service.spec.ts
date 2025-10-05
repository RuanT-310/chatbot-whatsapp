import { Test, TestingModule } from '@nestjs/testing';
import { WahaService } from './waha.service';

describe('WahaService', () => {
  let service: WahaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WahaService],
    }).compile();

    service = module.get<WahaService>(WahaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
