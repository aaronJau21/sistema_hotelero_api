import { Module } from '@nestjs/common';
import { DepartamentosService } from './departamentos.service';
import { DepartamentosController } from './departamentos.controller';
import { PrismaModule } from 'src/config/prisma/prisma.module';

@Module({
  controllers: [DepartamentosController],
  providers: [DepartamentosService],
  imports: [PrismaModule],
})
export class DepartamentosModule {}
