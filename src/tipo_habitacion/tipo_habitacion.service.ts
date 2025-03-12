import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { CreateTipoHabitacionDto } from './dto/create-tipo_habitacion.dto';
import { UpdateTipoHabitacionDto } from './dto/update-tipo_habitacion.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { TipoHabitacionEntity } from './entities';
import { IGetCategoryHabitacion } from './entities/get-category_habitacion';

@Injectable()
export class TipoHabitacionService {
  private readonly logger = new Logger(TipoHabitacionService.name);
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTipoHabitacionDto): Promise<TipoHabitacionEntity> {
    const tipo_habitacion = await this.prisma.categoria_habitaciones.findFirst({
      where: {
        nombre: data.nombre,
      },
    });

    if (tipo_habitacion) {
      this.logger.warn(`El tipo de habitación ya existe`);
      throw new BadRequestException('El tipo de habitación ya existe');
    }

    const new_tipo_habitacion = await this.prisma.categoria_habitaciones.create(
      {
        data,
      },
    );

    return { categoria_habitacion: new_tipo_habitacion };
  }

  async findAll(): Promise<IGetCategoryHabitacion[]> {
    return await this.prisma.categoria_habitaciones.findMany();
  }

  async findOne(id: number): Promise<IGetCategoryHabitacion> {
    const tipo_habitacion = await this.prisma.categoria_habitaciones.findFirst({
      where: { id },
    });

    if (!tipo_habitacion) {
      this.logger.warn(`El tipo de habitación no existe`);
      throw new NotFoundException('El tipo de habitación no existe');
    }

    return tipo_habitacion;
  }

  async update(
    id: number,
    data: UpdateTipoHabitacionDto,
  ): Promise<IGetCategoryHabitacion> {
    await this.findOne(id); // Verifica existencia
    return await this.prisma.categoria_habitaciones.update({
      where: { id },
      data,
    });
  }

  async updateStatus(id: number): Promise<IGetCategoryHabitacion> {
    const tipo_habitacion = await this.prisma.categoria_habitaciones.findFirst({
      where: { id },
    });

    if (!tipo_habitacion) {
      this.logger.warn(`El tipo de habitación no existe`);
      throw new BadRequestException('El tipo de habitación no existe');
    }

    return await this.prisma.categoria_habitaciones.update({
      where: { id },
      data: {
        status: !tipo_habitacion.status,
        deleted_at: new Date(),
      },
    });
  }
}
