import { CreateProductDto } from '../../dto/create-product.dto';
import { ProductResponseDto } from '../../dto/product-response.dto';

export abstract class CatalogRepositoryPort {
  abstract save(data: CreateProductDto): Promise<ProductResponseDto>;
  abstract findAll(): Promise<ProductResponseDto[]>;
  abstract findById(id: string): Promise<ProductResponseDto | null>;
}
