import { CreateProductDto } from '../../dto/create-product.dto';
import { ProductResponseDto } from '../../dto/product-response.dto';

export interface CatalogRepositoryPort {
  save(data: CreateProductDto): Promise<ProductResponseDto>;
  findAll(): Promise<ProductResponseDto[]>;
  findById(id: string): Promise<ProductResponseDto | null>;
}
