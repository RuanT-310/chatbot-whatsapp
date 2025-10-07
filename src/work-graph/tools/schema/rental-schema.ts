import { z } from 'zod';

export const rentalSchema = z.object({
  id: z.string().describe('Unique identifier for the rental'),
  status: z
    .string()
    .describe('Current status of the rental (e.g., available, rented)'),
  images: z.array(z.string()).describe('List of image URLs for the rental'),
  type: z
    .string()
    .describe('Type of the rental property (e.g., apartment, house)'),
  price: z.number().describe('Price of the rental'),
  title: z.string().describe('Title of the rental listing'),
  location: z.string().describe('General location of the rental'),
  sector: z.string().describe('Specific sector or neighborhood'),
  sqft: z.string().describe('Square footage of the rental'),
  bed: z.number().int().describe('Number of bedrooms'),
  bath: z.number().int().describe('Number of bathrooms'),
  contact: z.string().describe('Contact information for inquiries'),
  ownerId: z.string().describe('ID of the owner (User)'),
});

export type Rental = z.infer<typeof rentalSchema>;
// Esquema para criar um novo aluguel, omitindo 'id' e 'type'