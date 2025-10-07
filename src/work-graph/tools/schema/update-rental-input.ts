import z from 'zod';
import { createRentalSchema } from './create-rental-input';

// Esquema para criar um novo aluguel, omitindo 'id' e 'type'
export const updateRentalSchema = createRentalSchema.omit({
  ownerId: true,
});

export type UpdateRentalInput = z.infer<typeof updateRentalSchema>;

