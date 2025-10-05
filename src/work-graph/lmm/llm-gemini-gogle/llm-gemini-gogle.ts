import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { Injectable } from '@nestjs/common';
import { LLmProvider } from '../llm-provider';

@Injectable()
export class LlmGeminiGogle implements LLmProvider {
    model() {
        return new ChatGoogleGenerativeAI({
            model: "gemini-2.5-flash",
            apiKey: "AIzaSyCCON-LVfaNq8DzfsO3zYlis1qPUtWumxU"
        });
    }

}
