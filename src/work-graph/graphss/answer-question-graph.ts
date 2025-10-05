import { AIMessage } from "@langchain/core/messages";
import { AgentState } from "../states/agent-state";
import { END, MemorySaver, START, StateGraph } from "@langchain/langgraph";
import { searchTool } from "../toolss/search-tool";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createCallModelWithTools } from "../nodes/call-model";

const tools = [searchTool]
const toolNode = new ToolNode<typeof AgentState.State>(tools)
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: "AIzaSyCCON-LVfaNq8DzfsO3zYlis1qPUtWumxU"
});
const boundModel = model.bindTools(tools)

function shouldContinue(state: typeof AgentState.State): "action" | typeof END {
    const lastMessage = state.messages[state.messages.length - 1];
    // If there is no function call, then we finish
    if (lastMessage && !(lastMessage as AIMessage).tool_calls?.length) {
        return END;
    }
    // Otherwise if there is, we continue
    return "action";
}

// Define the function that calls the model
const callModel = createCallModelWithTools(boundModel)

const workflow = new StateGraph(AgentState)
    // Define the two nodes we will cycle between
    .addNode("agent", callModel)
    .addNode("action", toolNode)
    // We now add a conditional edge
    .addConditionalEdges(
        // First, we define the start node. We use `agent`.
        // This means these are the edges taken after the `agent` node is called.
        "agent",
        // Next, we pass in the function that will determine which node is called next.
        shouldContinue
    )
    // We now add a normal edge from `action` to `agent`.
    // This means that after `action` is called, `agent` node is called next.
    .addEdge("action", "agent")
    // Set the entrypoint as `agent`
    // This means that this node is the first one called
    .addEdge(START, "agent");
export const answerQuestionWorkflow = workflow.compile({
    checkpointer:  new MemorySaver() 
});