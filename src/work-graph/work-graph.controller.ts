import { Controller } from '@nestjs/common';
import { WorkGraphService } from './work-graph.service';

@Controller('work-graph')
export class WorkGraphController {
  constructor(private readonly workGraphService: WorkGraphService) {}
}
