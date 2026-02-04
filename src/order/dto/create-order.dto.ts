export class CreateOrderDto {
    customerId: number;
    paymentMethod: string;
    items: { stockId: number; quantity: number }[];
}
