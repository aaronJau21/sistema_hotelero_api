import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { HashService } from 'src/lib/hash/hash.service';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashService,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const { password, ...res } = createClientDto;
    const hashedPassword = await this.hashService.hashPassword(password);

    const newClient = await this.prisma.clientes.create({
      data: {
        ...res,
        password: hashedPassword,
      },
    });

    return newClient;
  }

  async findAll() {
    const clients = await this.prisma.clientes.findMany();
    return { clients };
  }

  async findOne(id: number) {
    const client = await this.prisma.clientes.findFirst({
      where: {
        id,
      },
    });

    if (!client) throw new NotFoundException('No existe');

    return client;
  }

  async update(id: number, data: UpdateClientDto) {
    await this.findOne(id);
    const client = await this.prisma.clientes.update({
      where: {
        id,
      },
      data,
    });

    return client;
  }

  async updateStatus(id: number) {
    const findOne = await this.findOne(id);
    const client = await this.prisma.clientes.update({
      where: {
        id,
      },
      data: {
        status: !findOne.status,
      },
    });

    return client;
  }

  async remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
