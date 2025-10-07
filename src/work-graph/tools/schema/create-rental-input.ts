import { z } from 'zod';
import { rentalSchema } from './rental-schema';

// Esquema para criar um novo aluguel, omitindo 'id' e 'type'
export const createRentalSchema = rentalSchema.omit({
  id: true,
});

export type CreateRentalInput = z.infer<typeof createRentalSchema>;
