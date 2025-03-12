import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class EstadosService {
  constructor(private readonly prisma: PrismaService) {}

  async getEstadoHabitacion() {
    const estadoHabitacion = await this.prisma.estado_habitacion.findMany();

    return estadoHabitacion;
  }
}
