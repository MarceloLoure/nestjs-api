import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const dataSource = app.get<DataSource>(getDataSourceToken());
  await dataSource.synchronize(true);

  const productRepo = dataSource.getRepository('Product')
  await productRepo.insert([
    {
        id: '7f8c9d8e-9f0a-1b2c-3d4e-5f6g7h8i9j8k',
        name: "Product 1",
        description: "Description 1",
        price: 100,
        image_url: 'http://localhost:9000/products/1.png'
    },
    {
        id: '7f8c9d8e-9f0a-1b2c-3d4e-5f6g7h8i9f5k',
        name: "Product 2",
        description: "Description 2",
        price: 200,
        image_url: 'http://localhost:9000/products/2.png'
    },
    {
        id: '7f8c8c8e-9f0a-1b2c-3d4e-5f6g7h8i9j8k',
        name: "Product 3",
        description: "Description 3",
        price: 300,
        image_url: 'http://localhost:9000/products/3.png'
    },
    {
        id: '7f8c9d8e-9f0a-1b2c-3c4e-5f6g7h8i9j8k',
        name: "Product 4",
        description: "Description 4",
        price: 400,
        image_url: 'http://localhost:9000/products/4.png'
    },
    {
        id: '7f8c9d8e-9f0a-1c2c-3d4e-5f6g7h8i9j8k',
        name: "Product 5",
        description: "Description 5",
        price: 500,
        image_url: 'http://localhost:9000/products/5.png'
    }
  ])
}
bootstrap();
