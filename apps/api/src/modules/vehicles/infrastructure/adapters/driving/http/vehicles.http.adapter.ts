import { Controller, Get } from '@nestjs/common';

import { toVehicleResponseDto } from './dto/find-vehicles-response.dto';
import { FindVehiclesUseCase } from '../../../../application/use-cases/find-vehicles.use-case';

@Controller('vehicles')
export class VehiclesHttpAdapter {
  constructor(private readonly findVehiclesUseCase: FindVehiclesUseCase) {}

  @Get()
  async findVehicles() {
    const vehicles = await this.findVehiclesUseCase.execute();

    return vehicles.map(toVehicleResponseDto);
  }
}
