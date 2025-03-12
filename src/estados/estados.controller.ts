import { Controller, Get } from '@nestjs/common';
import { EstadosService } from './estados.service';

@Controller('estados')
export class EstadosController {
  constructor(private readonly estadosService: EstadosService) {}

  @Get('habitacion')
  getEstadoHabitacion() {
    return this.estadosService.getEstadoHabitacion();
  }
}
