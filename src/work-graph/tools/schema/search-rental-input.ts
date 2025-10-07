import { z } from 'zod';

export const rentalSearchSchema = z.object({
  id: z.string().describe('Unique identifier for the rental'),
});

export type RentalSearchInput = z.infer<typeof rentalSearchSchema>;
// Esquema para criar um novo aluguel, omitindo 'id' e 'type'