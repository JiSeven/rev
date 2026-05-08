import { ProductEntity } from '../entities/product.entity';

export abstract class CatalogPort {
  abstract save(product: ProductEntity): Promise<ProductEntity>;

  abstract findAll(): Promise<ProductEntity[]>;
}
