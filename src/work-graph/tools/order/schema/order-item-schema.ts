import { z } from 'zod';

export const orderItemSchema = z.object({
  id: z.number().describe('Unique identifier for the order item'),
  quantity: z.number().describe('Quantity of the product'),
  unitPrice: z.number().describe('Price per unit at the time of sale'),
  stockId: z.number().describe('ID of the stock lot'),
  orderId: z.number().describe('ID of the order'),
});

export type OrderItem = z.infer<typeof orderItemSchema>;