import { z } from 'zod';
import { orderItemSchema } from './order-item-schema';
import { customerSchema } from './customer-schema';

export const orderSchema = z.object({
  id: z.number().describe('Unique identifier for the order'),
  status: z.enum(['pending', 'confirmed', 'cancelled', 'delivered']).describe('Current status of the order'),
  paymentMethod: z.enum(['pix', 'credit_card', 'debit_card', 'cash']).describe('Method used for payment'),
  paymentStatus: z.enum(['pending', 'paid', 'refunded']).describe('Status of the payment'),
  totalPrice: z.number().describe('Total price of the order'),
  createdAt: z.date().describe('Creation date of the order'),
  customerId: z.number().describe('ID of the customer associated with the order'),
  items: z.array(orderItemSchema).describe('List of items included in the order'),
});

export type Order = z.infer<typeof orderSchema>;