import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, HttpCode, HttpStatus } from '@nestjs/common';
import { WahaService } from './waha.service';
import { WebHookMessageDto } from './dto/webhook-messge-dto';
import { WorkGraphService } from 'src/work-graph/work-graph.service';
import { CustomerService } from 'src/customer/customer.service';
import { MessagesService } from 'src/messages/messages.service';
import { StockService } from 'src/stock/stock.service';
import { PromptService } from 'src/prompt/prompt.service';

@Controller('waha')
export class WahaController {
  private readonly logger = new Logger(WahaController.name);
  
  constructor(
    private readonly wahaService: WahaService,
    private readonly customerService: CustomerService,
    private readonly messagesService: MessagesService,
    private readonly agentService: WorkGraphService,
    private readonly stockService: StockService,
    private readonly promptService: PromptService,
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
    if (type !== 'text') return { status: 'message_not_supported' };
    const [customerNumber, _] = customerNumberString.split('@') as [string, string];
    this.logger.log(`Mensagem do tipo ${type} recebida de ${customerNumber} (${customerName}): ${payload.body} as ${timestamp}`);

    const todayStocks = await this.stockService.findStocksAvailable();
    try {
      let customer = await this.customerService.findByNumber(customerNumber);
      const newCustomer = !customer;
      if (!customer) {
        customer = await this.customerService.create({ name: customerName, number: customerNumber });
        this.logger.log(`Novo cliente criado: ${customer.number} - ID: ${customer.id}`);
      } 
      const [today, _] = new Date().toISOString().split('T');
      const todayMessages = newCustomer ? [] : await this.messagesService.findByDay(customer.id, today);
      const prompt = await this.promptService.generatePrompt(
        customer, 
        payload.body, 
        todayStocks, 
        todayMessages
      );
      const answer = await this.agentService.answerUserQuestion(prompt);
      this.logger.log(`Resposta gerada para ${customer.number}: ${answer}`);
      const message =  await this.messagesService.create({
        body: payload.body,
        timestamp: new Date(timestamp).toISOString(),
        customerId: customer.id,
      });
      await this.messagesService.createChatMessage({
        body: answer as string,
        timestamp: new Date().toISOString(),
        customerId: customer.id,
        ref: message.id //tem que pegar o id da mensagem recebida mesmo
      })
      
      this.logger.log(`respondendo cliente ${customer.number} na sessão ${data.session}`);
      await this.wahaService.sendTextMessage(
        payload.from, 
        answer as string,
        data.session
      );
      
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
  async healthCheck() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      messages: await this.messagesService.findAll(),
      stocks: await this.stockService.findStocksAvailable()
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