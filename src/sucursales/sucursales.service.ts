import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSucursaleDto } from './dto/create-sucursale.dto';
import { UpdateSucursaleDto } from './dto/update-sucursale.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { PaginationDto } from './dto/Pagination.dto';

@Injectable()
export class SucursalesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSucursaleDto, id_user: number) {
    const sucursal = await this.prisma.sucursales_hoteles.findFirst({
      where: {
        nombre: data.nombre,
      },
    });

    if (sucursal)
      throw new BadRequestException(
        `Ya existe una sucursal llamada ${sucursal.nombre}`,
      );

    const newSucursal = await this.prisma.sucursales_hoteles.create({
      data: {
        ...data,
        id_user,
      },
    });

    return newSucursal;
  }

  async findSelect() {
    const sucursal = await this.prisma.sucursales_hoteles.findMany({
      where: {
        status: true,
      },
    });

    return sucursal;
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const skip = (page! - 1) * limit!;

    // Obtener los datos con paginación
    const sucursales = await this.prisma.sucursales_hoteles.findMany({
      skip: skip,
      take: limit,
      orderBy: {
        id: 'asc',
      },
    });
    const total = await this.prisma.sucursales_hoteles.count();

    return {
      data: sucursales,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit!),
      },
    };
  }
  async findOne(id: number) {
    const data = await this.prisma.sucursales_hoteles.findFirst({
      where: {
        id,
      },
    });

    if (!data) {
      throw new NotFoundException('No existe la sucursal');
    }

    return data;
  }

  update(id: number, updateSucursaleDto: UpdateSucursaleDto) {
    return `This action updates a #${id} sucursale`;
  }

  async update_status(id: number) {
    const sucursal = await this.findOne(id);

    const updateStatus = await this.prisma.sucursales_hoteles.update({
      where: {
        id,
      },
      data: {
        status: !sucursal.status,
      },
    });

    return updateStatus;
  }

  remove(id: number) {
    return `This action removes a #${id} sucursale`;
  }
}
