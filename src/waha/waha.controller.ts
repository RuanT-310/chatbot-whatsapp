import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, HttpCode, HttpStatus } from '@nestjs/common';
import { WahaService } from './waha.service';
import { WebHookMessageDto } from './dto/webhook-messge-dto';
import { WorkGraphService } from 'src/work-graph/work-graph.service';
import { CustomerService } from 'src/customer/customer.service';

@Controller('waha')
export class WahaController {
  private readonly logger = new Logger(WahaController.name);
  
  constructor(
    private readonly wahaService: WahaService,
    private readonly customerService: CustomerService,
    private readonly agentService: WorkGraphService
  ) {}


  @Post('/webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(@Body() {me, payload, ...data}: WebHookMessageDto): Promise<{ status: string }> {
    this.logger.log(`Webhook recebido: event-[${data.event}] sessão-[${data.session}]`);
    //user exist? check by number
    //if not, create user
    //save message with session
    //get last messages with same session
    //get context to agent for it answer user
    //save answer from agent
    //send answer to waha

    //crud user
    //crud message
    
    const {
      SenderAlt: customerNumberString, 
      PushName: customerName, 
      Type: type, 
      Timestamp: timestamp
    } = payload._data.Info
    const [customerNumber, _] = customerNumberString.split('@') as [string, string];
    this.logger.log(`Mensagem do tipo ${type} recebida de ${customerNumber} (${customerName}): ${payload.body} as ${timestamp}`);
    try {
      if (type !== 'text') return { status: 'message_not_supported' }; //only text messages for now
      let customer = await this.customerService.findByNumber(customerNumber);
      if (!customer) {
        customer = await this.customerService.create({ name: customerName, number: customerNumber });
        this.logger.log(`Novo cliente criado: ${customer.number} - ID: ${customer.id}`);
      } else {
        this.logger.log(`Cliente existente: ${customer.number} - ID: ${customer.id}`);
      }
      console.log('Customer:', customer);
       /* const resposta = await this.agentService.answerUserQuestion(payload.body);
        console.log(resposta)
      await this.wahaService.sendTextMessage(
        payload.from, 
        resposta as string, 
        data.session
      ); */
      return { status: 'success' };
    } catch (error) {
      this.logger.error('Erro ao processar webhook:', error);
      return { status: 'error_handled' };
    }
  }

  @Get('/health')
  @HttpCode(HttpStatus.OK)
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }
}
/*  Info: {
      Chat: '248258303660074@lid',
      Sender: '248258303660074@lid',
      IsFromMe: false,
      IsGroup: false,
      AddressingMode: '',
      SenderAlt: '559484433460@s.whatsapp.net',
      RecipientAlt: '',
      BroadcastListOwner: '',
      BroadcastRecipients: null,
      ID: 'A5EF1DEE3BFE35E11ADF54CF000AC426',
      ServerID: 0,
      Type: 'text',
      PushName: 'Amantes Da Lua',
      Timestamp: '2026-02-03T16:36:29Z',
      Category: '',
      Multicast: false,
      MediaType: '',
      Edit: '',
      MsgBotInfo: [Object],
      MsgMetaInfo: [Object],
      VerifiedName: [Object],
      DeviceSentMeta: null
    }, */