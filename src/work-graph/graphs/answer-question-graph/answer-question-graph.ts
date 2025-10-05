import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { AIMessage } from '@langchain/core/messages';
import { DynamicTool } from '@langchain/core/tools';
import { BaseCheckpointSaver, BaseStore, END, START, StateGraph } from '@langchain/langgraph';
import { All, BaseCache } from '@langchain/langgraph-checkpoint';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import { Injectable } from '@nestjs/common';
import { N } from 'node_modules/@langchain/langgraph/dist/prebuilt/react_agent_executor';
import { LLmProvider } from 'src/work-graph/lmm/llm-provider';
import { createCallModelWithTools } from 'src/work-graph/nodes/call-model';
import { AgentState } from 'src/work-graph/states/agent-state';
import { SegredoCaixa } from 'src/work-graph/tools/segredo-caixa/segredo-caixa';
import { th } from 'zod/v4/locales';

@Injectable()
export class AnswerQuestionGraph {
    model: BaseChatModel
    tools: DynamicTool[] = []
    constructor (
        modelProvider: LLmProvider,
        segredoCaixaToolProvider: SegredoCaixa
    ) {
        this.tools.push(
            segredoCaixaToolProvider.tool()
        )
        this.model = modelProvider.model()
    }
    compiled(config?: {
        checkpointer?: BaseCheckpointSaver | boolean;
        store?: BaseStore;
        cache?: BaseCache;
        interruptBefore?: N[] | All;
        interruptAfter?: N[] | All;
        name?: string;
        description?: string;
    }) {
        console.log(this.tools)
        return this.graph().compile(config as any);
    }
    graph() {
        
        const model = this.model
        if (!model.bindTools) throw new Error("Model must have bindTools method")
        const tools = this.tools
        const boundModel = model.bindTools(tools)
        const toolNode = new ToolNode<typeof AgentState.State>(tools)
        const callModel = createCallModelWithTools(boundModel)
        
        return new StateGraph(AgentState)
            // Define the two nodes we will cycle between
            .addNode("agent", callModel)
            .addNode("action", toolNode)
            // We now add a conditional edge
            .addConditionalEdges(
                // First, we define the start node. We use `agent`.
                // This means these are the edges taken after the `agent` node is called.
                "agent",
                // Next, we pass in the function that will determine which node is called next.
                this.shouldContinue
            )
            // We now add a normal edge from `action` to `agent`.
            // This means that after `action` is called, `agent` node is called next.
            .addEdge("action", "agent")
            // Set the entrypoint as `agent`
            // This means that this node is the first one called
            .addEdge(START, "agent")
    }

    shouldContinue(state: typeof AgentState.State): "action" | typeof END {
        const lastMessage = state.messages[state.messages.length - 1];
        // If there is no function call, then we finish
        if (lastMessage && !(lastMessage as AIMessage).tool_calls?.length) {
            return END;
        }
        // Otherwise if there is, we continue
        return "action";
    }
}
