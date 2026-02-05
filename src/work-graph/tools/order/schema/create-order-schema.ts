import { z } from 'zod';
import { orderSchema } from './order-schema';

// Esquema para criar um novo aluguel, omitindo 'id' e 'type'
export const createOrderSchema = orderSchema.omit({
  id: true,
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;