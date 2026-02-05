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
    const wahaUrl = this.configService.getOrThrow<string>('WAHA_URL');
    const wahaApiKey = this.configService.getOrThrow<string>('WAHA_API_KEY');

    const response = this.httpService.post<any>(
      `${wahaUrl}/api/sendText`,
      {
        session,
        chatId,
        text,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': wahaApiKey
        },
      },
    )
    return firstValueFrom(response);
  }
}