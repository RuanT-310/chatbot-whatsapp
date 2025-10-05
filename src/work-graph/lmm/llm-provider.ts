import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class LLmProvider {
    model(): BaseChatModel {
        throw new Error("Method not implemented.");
    }
} 