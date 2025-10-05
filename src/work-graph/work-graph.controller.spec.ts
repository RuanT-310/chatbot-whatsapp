import { Test, TestingModule } from '@nestjs/testing';
import { WorkGraphController } from './work-graph.controller';
import { WorkGraphService } from './work-graph.service';

describe('WorkGraphController', () => {
  let controller: WorkGraphController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkGraphController],
      providers: [WorkGraphService],
    }).compile();

    controller = module.get<WorkGraphController>(WorkGraphController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
