import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateHabitacioneDto } from './dto/create-habitacione.dto';
import { UpdateHabitacioneDto } from './dto/update-habitacione.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { ICreateHabitacion } from './entities/habitacione.entity';

@Injectable()
export class HabitacionesService {
  private readonly logger = new Logger(HabitacionesService.name);
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: CreateHabitacioneDto,
    id_user: number,
  ): Promise<ICreateHabitacion> {
    if (!id_user) {
      this.logger.error('No se encontro el id del usuario');
      throw new NotFoundException('No se encontro el id del usuario');
    }

    const habitaciones = await this.prisma.habitaciones.create({
      data: {
        ...data,
        id_user,
      },
    });

    return habitaciones;
  }

  async findAll(): Promise<ICreateHabitacion[]> {
    const habitaciones = await this.prisma.habitaciones.findMany({
      include: {
        Categoria_habitaciones: true,
        Estado_habitacion: true,
      },
    });

    return habitaciones;
  }

  async findOne(id: number) {
    const habitacion = await this.prisma.habitaciones.findUnique({
      where: { id },
      include: {
        Categoria_habitaciones: true,
        Estado_habitacion: true,
      },
    });

    if (!habitacion) {
      this.logger.error(`No se encontro la habitacion con el id ${id}`);
      throw new NotFoundException(
        `No se encontro la habitacion con el id ${id}`,
      );
    }

    return habitacion;
  }

  async update(id: number, updateHabitacioneDto: UpdateHabitacioneDto) {
    await this.findOne(id);
    const habitacion = await this.prisma.habitaciones.update({
      where: { id },
      data: updateHabitacioneDto,
    });

    return habitacion;
  }
  async update_estatus(id: number) {
    const habitacion = await this.findOne(id);
    const habitacionStatus = await this.prisma.habitaciones.update({
      where: { id },
      data: {
        status: !habitacion.status,
      },
    });

    return habitacionStatus;
  }

  remove(id: number) {
    return `This action removes a #${id} habitacione`;
  }
}
