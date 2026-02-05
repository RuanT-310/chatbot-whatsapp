import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from 'node_modules/@langchain/openai/dist/chat_models';

@Injectable()
export class LlmOpenIa {
    constructor(
        private readonly configService: ConfigService
    ){}
    model() {
        return new ChatOpenAI({
           apiKey: this.configService.get<string>('OPENAI_API_KEY'),
           modelName: "gpt-5-nano",
        });
    }
}
