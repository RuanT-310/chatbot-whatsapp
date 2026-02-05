import { Injectable } from '@nestjs/common';
import { tool } from 'node_modules/@langchain/core/dist/tools';
import { OrderService } from 'src/order/order.service';
import { createOrderSchema } from '../schema/create-order-schema';
import z from 'zod';

@Injectable()
export class CreateOrder {
    
    constructor(
    private orderService: OrderService
    ) {}

    tool() {
        return tool(this.toolFunction.bind(this), {
            name: "create_order",
            description: `create a new order in the system with the provided details.`,
            schema: createOrderSchema,
            verbose: true
        });
    }

    async toolFunction(input: z.infer<typeof createOrderSchema>) {
        return await this.orderService.create(input);
    }
}
