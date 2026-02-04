import { Injectable, Logger } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Between, Like, Repository } from 'typeorm';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';

@Injectable()
export class MessagesService {
  private readonly logger = new Logger(MessagesService.name);
  
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}
    
  create(createMessageDto: CreateMessageDto) {
    this.logger.warn(`Creating message with DTO: ${JSON.stringify(createMessageDto)}`);
    return this.messagesRepository.save({
      customer: { id: createMessageDto.customerId },
      body: createMessageDto.body,
      timestamp: createMessageDto.timestamp,
    });
  }

   createChatMessage(createMessageDto: CreateChatMessageDto) {
    this.logger.warn(`Creating chat message with DTO: ${JSON.stringify(createMessageDto)}`);
    return this.messagesRepository.save({
      customer: { id: createMessageDto.customerId },
      body: createMessageDto.body,
      timestamp: createMessageDto.timestamp,
      ref: { id: createMessageDto.ref }
    });
  }

  findByDay(customerId: number, dateString: string) {
    return this.messagesRepository.find({
      where: {
        customer: { id: customerId },
        timestamp: Like(`${dateString}%`)
      },
      relations: {
        ref: true,
      },
      select: {
        id: true,
        body: true,
        timestamp: true,
        ref: { id: true }
      }
    });
  }

  findAll() {
    return this.messagesRepository.find({
      relations: {
        customer: true,
      },
      select: {
        id: true,
        body: true,
        timestamp: true,
        ref: { id: true },
        customer: { id: true }
      }
    }); 
  }

  findOne(customerId: number, id: number) {
    return this.messagesRepository.findOneBy({ id, customer: { id: customerId } });
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return this.messagesRepository.update(id, updateMessageDto);
  }

  remove(id: number) {
    return this.messagesRepository.delete(id);
  }

  async chatMessagesPrompt (messages: Message[]) {
    const promises = messages.map(async (msg) => {
      console.log(msg);
      if (!!msg.ref) return null;
      const agentMessage = messages.find(m => m.ref?.id === msg.id);
      return `Customer (${msg.timestamp}): ${msg.body} - Agent: ${agentMessage?.body || 'No response yet'}`;
    })
    return (await Promise.all(promises)).filter(m => m !== null).join('\n');
  }
}
