import { Module } from '@nestjs/common';
import { EstadosService } from './estados.service';
import { EstadosController } from './estados.controller';
import { PrismaModule } from 'src/config/prisma/prisma.module';

@Module({
  controllers: [EstadosController],
  providers: [EstadosService],
  imports: [PrismaModule],
})
export class EstadosModule {}
