import { Controller, Get } from '@nestjs/common';

import { FindVehiclesUseCase } from './use-cases/find-vehicles.use-case';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly findVehiclesUseCase: FindVehiclesUseCase) {}

  @Get()
  async findVehicles() {
    return this.findVehiclesUseCase.execute();
  }
}
