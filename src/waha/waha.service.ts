import { Injectable } from '@nestjs/common';
import { WebHookMessageDto } from './dto/webhook-messge-dto';
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class WahaService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async sendTextMessage(chatId: string, text: string, session: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const response = this.httpService.post<any>(
      `${this.configService.getOrThrow<string>('WAHA_URL')}/api/sendText`,
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