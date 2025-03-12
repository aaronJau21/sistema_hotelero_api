import { Module } from '@nestjs/common';
import { TipoHabitacionService } from './tipo_habitacion.service';
import { TipoHabitacionController } from './tipo_habitacion.controller';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { LibModule } from 'src/lib/lib.module';

@Module({
  controllers: [TipoHabitacionController],
  providers: [TipoHabitacionService],
  imports: [PrismaModule, LibModule],
})
export class TipoHabitacionModule {}
