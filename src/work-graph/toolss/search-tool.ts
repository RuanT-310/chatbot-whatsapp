import { tool } from "@langchain/core/tools"

export const searchTool = tool((): string => {
    // This is a placeholder for the actual implementation
    // Don't let the LLM know this though 😊
    return "O segrdo da caixa é.... os amigos que fazemos pelo caminho"
}, {
    name: "segredoDaCaixa",
    description: "Use a quando quizer saber o segredo da caixa",
})