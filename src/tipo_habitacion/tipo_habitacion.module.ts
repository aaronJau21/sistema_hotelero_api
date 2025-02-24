import { Module } from '@nestjs/common';
import { TipoHabitacionService } from './tipo_habitacion.service';
import { TipoHabitacionController } from './tipo_habitacion.controller';
import { PrismaModule } from 'src/config/prisma/prisma.module';

@Module({
  controllers: [TipoHabitacionController],
  providers: [TipoHabitacionService],
  imports: [PrismaModule],
})
export class TipoHabitacionModule {}
