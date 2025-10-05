import { Test, TestingModule } from '@nestjs/testing';
import { WorkGraphService } from './work-graph.service';

describe('WorkGraphService', () => {
  let service: WorkGraphService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkGraphService],
    }).compile();

    service = module.get<WorkGraphService>(WorkGraphService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
