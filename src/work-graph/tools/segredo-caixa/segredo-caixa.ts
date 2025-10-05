import { tool } from '@langchain/core/tools';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SegredoCaixa {
    tool() {
        return tool(this.toolFunction.bind(this), {
            name: "segredoDaCaixa",
            description: "Use a quando quizer saber o segredo da caixa",
        })
    }

    toolFunction(): string {
        return  "O segredo da caixa é.... os amigos que fazemos pelo caminho"
    }   
}
