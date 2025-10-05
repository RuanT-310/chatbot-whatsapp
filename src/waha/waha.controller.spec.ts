import { Test, TestingModule } from '@nestjs/testing';
import { WahaController } from './waha.controller';
import { WahaService } from './waha.service';

describe('WahaController', () => {
  let controller: WahaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WahaController],
      providers: [WahaService],
    }).compile();

    controller = module.get<WahaController>(WahaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
