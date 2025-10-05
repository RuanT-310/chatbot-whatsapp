import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { Injectable } from '@nestjs/common';
import { LLmProvider } from '../llm-provider';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LlmGeminiGogle implements LLmProvider {
    constructor(
        private readonly configService: ConfigService
    ){}
    model() {
        return new ChatGoogleGenerativeAI({
            model: "gemini-2.5-flash",
            apiKey: this.configService.get<string>('GEMINIAPIKEY'),
        });
    }

}
