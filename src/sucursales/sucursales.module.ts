import { Module } from '@nestjs/common';
import { SucursalesService } from './sucursales.service';
import { SucursalesController } from './sucursales.controller';
import { PrismaModule } from 'src/config/prisma/prisma.module';

@Module({
  controllers: [SucursalesController],
  providers: [SucursalesService],
  imports: [PrismaModule],
})
export class SucursalesModule {}
