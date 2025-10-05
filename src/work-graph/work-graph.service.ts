import { HumanMessage } from "@langchain/core/messages";
import { Injectable } from '@nestjs/common';
import { answerQuestionWorkflow } from "./graphss/answer-question-graph";

@Injectable()
export class WorkGraphService {
    answerQuestion(question: string){
        return "respondido"
    }
    async answerUserQuestion(question: string){

        const answer = await answerQuestionWorkflow.invoke({
            messages: [new HumanMessage(question)],
            
        }, {
            configurable: {
                thread_id: "user-123-conversation-456",
            },
        })
        return answer.messages[answer.messages.length - 1].content
    }
}
