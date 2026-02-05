import { z } from 'zod';

export const customerSchema = z.object({
  id: z.number().describe('Unique identifier for the customer'),
  name: z.string().describe('Name of the customer'),
  number: z.string().describe('Phone number of the customer'),
});

export type Customer = z.infer<typeof customerSchema>;