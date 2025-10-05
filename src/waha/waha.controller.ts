import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WahaService } from './waha.service';
import { CreateWahaDto } from './dto/create-waha.dto';
import { UpdateWahaDto } from './dto/update-waha.dto';
import { WahaWebHookDto } from './dto/waha-web-hook-dto';

@Controller('waha')
export class WahaController {
  constructor(private readonly wahaService: WahaService) {}


  @Post()
  webhook(@Body() wahaWebHookDto: WahaWebHookDto) {
    return this.wahaService.create(wahaWebHookDto);
  }
}
