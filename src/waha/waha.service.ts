import { Injectable } from '@nestjs/common';
import { CreateWahaDto } from './dto/create-waha.dto';
import { UpdateWahaDto } from './dto/update-waha.dto';
import { WebHookMessageDto } from './dto/webhook-messge-dto';
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs';
@Injectable()
export class WahaService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  async sendTextMessage(chatId: string, text: string, session: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const response = this.httpService.post<any>(
      `${'http://localhost:4000'}/api/sendText`,
      {
        session,
        chatId,
        text,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': 'admin'
        },
      },
    )
    return firstValueFrom(response);
  }
}