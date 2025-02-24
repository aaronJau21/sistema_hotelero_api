import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateTipoHabitacionDto } from './dto/create-tipo_habitacion.dto';
import { UpdateTipoHabitacionDto } from './dto/update-tipo_habitacion.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { TipoHabitacionEntity } from './entities/tipo-habitacion.entity';

@Injectable()
export class TipoHabitacionService {
  private readonly logger = new Logger(TipoHabitacionService.name);
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTipoHabitacionDto): Promise<TipoHabitacionEntity> {
    try {
      const tipo_habitacion =
        await this.prisma.categoria_habitaciones.findFirst({
          where: {
            nombre: data.nombre,
          },
        });

      if (tipo_habitacion) {
        throw new BadRequestException('El tipo de habitación ya existe');
      }

      const new_tipo_habitacion =
        await this.prisma.categoria_habitaciones.create({
          data,
        });

      return { categoria_habitacion: new_tipo_habitacion };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      this.logger.error(error.message);
      throw new InternalServerErrorException('Error del Servidor');
    }
  }

  findAll() {
    return `This action returns all tipoHabitacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoHabitacion`;
  }

  update(id: number, updateTipoHabitacionDto: UpdateTipoHabitacionDto) {
    return `This action updates a #${id} tipoHabitacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoHabitacion`;
  }
}
