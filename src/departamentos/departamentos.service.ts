import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class DepartamentosService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateDepartamentoDto) {
    const newDepartamento = await this.prisma.departamentos.create({
      data,
    });

    return newDepartamento;
  }

  async findAll() {
    const departamentos = await this.prisma.departamentos.findMany();
    return departamentos;
  }

  async findOne(id: number) {
    const departamento = await this.prisma.departamentos.findFirst({
      where: { id },
    });

    if (!departamento) throw new NotFoundException('No existe el departamento');

    return departamento;
  }

  async update(id: number, updateDepartamentoDto: UpdateDepartamentoDto) {
    await this.findOne(id);
    const departamento = await this.prisma.departamentos.update({
      where: { id },
      data: updateDepartamentoDto,
    });

    return departamento;
  }
  async updateStatus(id: number) {
    const departamento = await this.findOne(id);
    const update = await this.prisma.departamentos.update({
      where: {
        id,
      },
      data: {
        status: !departamento.status,
      },
    });

    return update;
  }

  remove(id: number) {
    return `This action removes a #${id} departamento`;
  }
}
