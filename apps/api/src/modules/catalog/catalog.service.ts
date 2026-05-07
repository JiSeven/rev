import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CatalogService {
  private readonly products = [
    {
      id: '1',
      name: 'Veloria Midnight',
      brand: 'Veloria',
      type: 'CANDLE',
      price: 85,
      description:
        'A luxurious scented candle that evokes the mystery of a starlit night.',
      scentProfile: {
        top: ['Bergamot', 'Black Pepper'],
        heart: ['Rose', 'Cedarwood'],
        base: ['Sandalwood', 'Amber', 'Musk'],
      },
    },
    {
      id: '2',
      name: 'Ethereal Mist',
      brand: 'Veloria',
      type: 'PERFUME',
      price: 120,
      description:
        'A light, airy fragrance designed for those who appreciate subtle elegance.',
      scentProfile: {
        top: ['Lemon', 'Mint'],
        heart: ['Jasmin', 'Green Tea'],
        base: ['White Musk'],
      },
    },
  ];

  findOne(id: string) {
    const product = this.products.find((p) => p.id === id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }
}
