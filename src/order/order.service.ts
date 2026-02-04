import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order, OrderStatus, PaymentMethod, PaymentStatus } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Stock } from '../stock/entities/stock.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
    private dataSource: DataSource,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let totalOrderPrice = 0;
      const orderItems: OrderItem[] = [];

      // Processa cada item do pedido
      for (const itemData of createOrderDto.items) {
        const stock = await queryRunner.manager.findOne(Stock, {
          where: { id: itemData.stockId },
          relations: ['product'],
        });

        if (!stock) throw new NotFoundException(`Lote ${itemData.stockId} não encontrado`);

        // Verifica disponibilidade considerando a reserva atual
        const available = stock.quantity - stock.reservedQuantity;
        if (available < itemData.quantity) {
          throw new BadRequestException(`Estoque insuficiente para ${stock.product.name}`);
        }

        // 1. Atualiza a reserva no estoque
        stock.reservedQuantity += Number(itemData.quantity);
        await queryRunner.manager.save(stock);

        // 2. Calcula preço e cria o OrderItem
        const unitPrice = stock.product.price;
        totalOrderPrice += unitPrice * itemData.quantity;

        const orderItem = queryRunner.manager.create(OrderItem, {
          quantity: itemData.quantity,
          unitPrice: unitPrice,
          stock: stock,
        });

        orderItems.push(orderItem);
      }

      // 3. Cria a Ordem Mestre com os itens (Cascade salva os itens automaticamente)
      const order = queryRunner.manager.create(Order, {
        customer: { id: createOrderDto.customerId },
        paymentMethod: createOrderDto.paymentMethod as PaymentMethod,
        totalPrice: totalOrderPrice,
        status: OrderStatus.PENDING,
        paymentStatus: PaymentStatus.PENDING,
        items: orderItems, // cascade: true cuidará do resto
      });

      const savedOrder = await queryRunner.manager.save(order);
      await queryRunner.commitTransaction();
      return savedOrder;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async confirmDelivery(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'items.stock'],
    });

    if (!order || order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('Pedido não está pendente ou não existe');
    }

    // Para cada item, subtrai a quantidade física e limpa a reserva
    for (const item of order.items) {
      const stock = item.stock;
      stock.quantity -= item.quantity;
      stock.reservedQuantity -= item.quantity;
      await this.stockRepository.save(stock);
    }

    order.status = OrderStatus.DELIVERED;
    return await this.orderRepository.save(order);
  }

  async cancel(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'items.stock'],
    });

    if (!order) throw new NotFoundException('Pedido não encontrado');

    if (order.status === OrderStatus.PENDING) {
      for (const item of order.items) {
        const stock = item.stock;
        stock.reservedQuantity -= item.quantity;
        await this.stockRepository.save(stock);
      }
    }

    order.status = OrderStatus.CANCELLED;
    return await this.orderRepository.save(order);
  }

  async markAsPaid(id: number) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) throw new NotFoundException('Pedido não encontrado');
    order.paymentStatus = PaymentStatus.PAID;
    return await this.orderRepository.save(order);
  }

  async findAll() {
    return await this.orderRepository.find({
      relations: ['customer', 'items', 'items.stock', 'items.stock.product'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOneWithItems(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: [
        'customer', 
        'items', 
        'items.stock', 
        'items.stock.product'
      ],
    });

    if (!order) {
      throw new NotFoundException(`Pedido #${id} não encontrado.`);
    }

    return order;
  }
}