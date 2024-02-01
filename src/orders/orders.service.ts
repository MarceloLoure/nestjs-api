import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { In, Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>
    ) {}

  create(createOrderDto: CreateOrderDto) {
    const productIds = createOrderDto.items.map(item => item.product_id);
    const uniqueProductIds = [...new Set(productIds)];
    const products = await this.productRepo.findBy({
      id: In(uniqueProductIds)
    });

    if(products.length !== uniqueProductIds.length) {
      throw new Error(`Algum produto nçao foi encontrado, produtos encontrados ${products.map(product => product.id)}`);
    }

    const order = Order.create({
      client_id: 1,
      items: createOrderDto.items.map(item => {
        const product = products.find(product => product.id === item.product_id);
        return {
          product_id: item.product_id,
          quantity: item.quantity,
          price: product.price
        }
      })
    });

    this.orderRepo.save(order);
    return order;
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }
}
