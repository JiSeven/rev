import { CreateMotorcycleUseCase } from '@/catalog/application/use-cases/create-motorcycle.use-case';
import { Controller, Get, Param } from '@nestjs/common';
import {
  MotorcycleResponseDto,
  toMotorcycleResponseDto,
} from './dto/get-motorcycle.dto';
import { GetMotorcycleUseCase } from '@/catalog/application/use-cases/get-motorcycle.use-case';
import { GetAllMotorcyclesUseCase } from '@/catalog/application/use-cases/get-motorcycles.use-case';

@Controller('catalog')
export class CatalogHttpAdapter {
  constructor(
    private readonly createMotorcycleUseCase: CreateMotorcycleUseCase,
    private readonly getMotorcycleUseCase: GetMotorcycleUseCase,
    private readonly getAllMotorcyclesUseCase: GetAllMotorcyclesUseCase,
  ) {}

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<MotorcycleResponseDto | null> {
    const motorcycle = await this.getMotorcycleUseCase.execute(id);

    if (motorcycle) {
      return toMotorcycleResponseDto(motorcycle);
    }

    return null;
  }

  @Get()
  async findAll(): Promise<MotorcycleResponseDto[]> {
    const motorcycles = await this.getAllMotorcyclesUseCase.execute();

    return motorcycles.map(toMotorcycleResponseDto);
  }
}
