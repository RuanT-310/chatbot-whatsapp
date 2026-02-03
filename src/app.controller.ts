import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { WebHookMessageDto } from './waha/dto/webhook-messge-dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  test(@Body() {me, payload, ...data}: WebHookMessageDto): string {
    console.log(me, payload, data)
    return this.appService.getHello();
  }
}
