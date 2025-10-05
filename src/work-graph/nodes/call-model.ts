import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { AgentState } from "../states/agent-state";
import { Runnable } from "@langchain/core/runnables";
import { BaseFunctionCallOptions, BaseLanguageModelInput } from "@langchain/core/language_models/base";
import { AIMessageChunk } from "@langchain/core/messages";

export function createCallModelWithTools(model: Runnable<BaseLanguageModelInput, AIMessageChunk, BaseFunctionCallOptions>) {
    async function callModel(state: typeof AgentState.State) {
        // 3. O 'model' injetado está disponível aqui via Closure
        const response = await model.invoke(state.messages);
        
        // Retorna o resultado para ser mesclado ao estado
        return { messages: [response] };
    }
    return callModel; 
}