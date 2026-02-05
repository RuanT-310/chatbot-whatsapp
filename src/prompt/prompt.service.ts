import { Injectable } from '@nestjs/common';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { UpdatePromptDto } from './dto/update-prompt.dto';
import { Message } from 'src/messages/entities/message.entity';
import { Stock } from 'src/stock/entities/stock.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Injectable()
export class PromptService {
  
  // Informações base da empresa (Configuração do Sistema)
  private readonly BASE_INFO = `
    Nome da empresa: Cantinho dos Assados 
    Endereço: Rua Presidente Juscelino 506, Marabá - PA.
    Horário: Somente aos DOMINGOS, das 08h às 14h.
    Pagamento: Pix (63) 99213-7566 (Maria das Graças Vieira Rolim) ou Maquininha na entrega.
    Política: Recomendamos retirar na loja para maior rapidez.
  `;

  // Prompt Principal: Define a personalidade e as regras de negócio
  systemInstruction(customer: Customer, stocks: Stock[]) {
    const stockString = this.organizeStocks(stocks);
    
    return `
    Você é o assistente virtual do Cantinho dos Assados. Seu objetivo é realizar vendas de forma educada e eficiente.
    
    ${this.BASE_INFO}

    DADOS DO CLIENTE:
    ${this.organizeCustomers([customer])}

    ESTOQUE ATUAL EM TEMPO REAL:
    ${stockString}

    INFORMAÇÕES DE OURO:
    ${this.adicionalInstruction}

    REGRAS DE OURO:
    1. PRODUTOS: Só ofereça o que está na lista de estoque acima. Se a quantidade for 0, diga que acabou.
    2. QUANTIDADE: Aceitamos pedidos de quantidades inteiras ou "bandas" (0.5). Ex: "1 frango e meio" = 1.5.
    3. FLUXO DE VENDA:
       - Identifique o que o cliente quer e a quantidade.
       - SEMPRE confirme o valor total (Qtd * Preço) antes de finalizar.
       - Para finalizar, peça o NOME e se será RETIRADA ou ENTREGA (se entrega, peça o endereço).
    4. PIX: Se o cliente escolher Pix, informe a chave e peça o comprovante.
    5. ESTILO: Seja cordial, use emojis de comida 🍗🥤, mas seja direto. Você está em Marabá-PA.

    Responda de forma curta e evite textos gigantes.
    `;
  }

  async generatePrompt(customer: Customer, currentMessage: string, stocks: Stock[], history: Message[]) {
    const isFirstMessageOfDay = history.length === 0;
    // 1. Definição do Papel (System Instruction)
    let prompt = this.systemInstruction(customer, stocks);

    // 2. Injeção de Contexto Baseado no Momento
    if (isFirstMessageOfDay) {
      prompt += `\n\nCONTEXTO: Este é o primeiro contato do cliente hoje. 
      Cumprimente-o pelo nome. 
      Aguarde ele dizer o que deseja.`;
    } else {
      const historyString = this.organizeMessages(history);
      prompt += `\n\nCONTEXTO DA CONVERSA EM ANDAMENTO:
      ${historyString}
      
      O cliente acabou de dizer: "${currentMessage}". 
      Continue o atendimento de onde pararam, focando em fechar o pedido ou tirar dúvidas específicas.`;
    }

    return prompt;
  }

  adicionalInstruction() {
    return `COMPORTAMENTO DE ATENDIMENTO
    - Nunca mencione a quantidade no estoque diretamente ao cliente.
    - Seja sucinto: se perguntarem o preço, dê o preço. Não ofereça o combo se não pedirem.
    - Gerencie a expectativa: a entrega em Xambioá demora; sugira sempre a retirada no balcão como vantagem.
    - Filtre curiosos: responda dúvidas técnicas (preço/horário) de forma objetiva, sem insistir na venda imediata.
    - Respeite o vocabulário: 'Banda' é o padrão para 0.5 frango. Nunca corrija o cliente, apenas entenda a matemática.`
  }

  // Organiza o histórico para o modelo entender o contexto da conversa
  organizeMessages(messages: Message[]) {
    return messages.map(msg => {
      const role = !!msg.ref ? 'Assistente' : 'Cliente';
      return `${role}: ${msg.body}`;
    }).join('\n');
  }

  organizeCustomers(customers: Customer[]) {
    return customers.map(cust => {
      return `ID: ${cust.id} - ${cust.name} (Telefone: ${cust.number})`;
    }).join('\n');
  }

  // Transforma o estoque do banco em texto para o LLM
  organizeStocks(stocks: Stock[]) {
    if (stocks.length === 0) return "⚠️ No momento, todos os produtos estão esgotados.";
    return stocks.map(stock => {
      const disponivel = stock.quantity - stock.reservedQuantity;
      return `- ID: ${stock.id} | Produto: ${stock.product.name} | Preço: R$ ${stock.product.price} | Disponível: ${disponivel} | Estoque Físico: ${stock.quantity} | Reservado: ${stock.reservedQuantity} | Validade: ${stock.expirationDate} | Lote: ${stock.batchNumber || 'N/A'} | Obs: ${stock.observation || 'N/A'} | PRODUTO ID: ${stock.product.id}`;
    }).join('\n');
  }
}
