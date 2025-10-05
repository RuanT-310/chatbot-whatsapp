import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, HttpCode, HttpStatus } from '@nestjs/common';
import { WahaService } from './waha.service';
import { CreateWahaDto } from './dto/create-waha.dto';
import { UpdateWahaDto } from './dto/update-waha.dto';
import { WebHookMessageDto } from './dto/webhook-messge-dto';
import { WorkGraphService } from 'src/work-graph/work-graph.service';

@Controller('waha')
export class WahaController {
  private readonly logger = new Logger(WahaController.name);
  
  constructor(
    private readonly wahaService: WahaService,
    private readonly agentService: WorkGraphService
  ) {}


  @Post('/webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(@Body() webhookData: WebHookMessageDto): Promise<{ status: string }> {
    this.logger.log(`Webhook recebido: event-[${webhookData.event}] sessão-[${webhookData.session}]`);
    try {
      const resposta = await this.agentService.answerUserQuestion(webhookData.payload.body);
      console.log(resposta)
      await this.wahaService.sendTextMessage(
        webhookData.payload.from, 
        resposta as string, 
        webhookData.session
      );
      return { status: 'success' };
    } catch (error) {
      this.logger.error('Erro ao processar webhook:', error);
      return { status: 'error_handled' };
    }
  }

  @Post('/health')
  @HttpCode(HttpStatus.OK)
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }
}
