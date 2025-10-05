import { PartialType } from '@nestjs/mapped-types';
import { CreateWahaDto } from './create-waha.dto';

export class UpdateWahaDto extends PartialType(CreateWahaDto) {}
