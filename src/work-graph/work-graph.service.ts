import { BaseMessage, HumanMessage } from "@langchain/core/messages";
import { Injectable } from '@nestjs/common';
import { AnswerQuestionGraph } from "./graphs/answer-question-graph/answer-question-graph";
import { BinaryOperatorAggregate, CompiledStateGraph, MemorySaver, StateDefinition} from "@langchain/langgraph";

@Injectable()
export class WorkGraphService {
    private answerQuestionGraph: CompiledStateGraph<
        { messages: BaseMessage[];}, 
        { messages?: BaseMessage[] | undefined }, 
        "__start__" | "agent" | "action", 
        { messages: BinaryOperatorAggregate<BaseMessage[], BaseMessage[]>}, 
        StateDefinition
    >
    constructor (
        answerQuestionGraph: AnswerQuestionGraph
    ) {
        this.answerQuestionGraph = answerQuestionGraph.compiled({
            checkpointer:  new MemorySaver() 
        })
    }

    async flowNewCustomerConversation(newCustomerMessage: string) {
        // especific prompt for flow for new customers
        const answer = await this.answerQuestionGraph.invoke({
            messages: [new HumanMessage(newCustomerMessage)],
            
        }, {
            configurable: {
                thread_id: "user-123-conversation-456",
            },
        })
        const messages = answer.messages as BaseMessage[]
        return messages[messages.length - 1].content
    }
    async answerUserQuestion(question: string){

        const answer = await this.answerQuestionGraph.invoke({
            messages: [new HumanMessage(question)],
            
        }, {
            configurable: {
                thread_id: "user-123-conversation-456",
            },
        })
        const messages = answer.messages as BaseMessage[]
        return messages[messages.length - 1].content
    }
}
