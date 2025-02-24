import { Module } from '@nestjs/common';
import { LibModule } from './lib/lib.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './config/prisma/prisma.module';
import { TipoHabitacionModule } from './tipo_habitacion/tipo_habitacion.module';

@Module({
  imports: [LibModule, AuthModule, PrismaModule, TipoHabitacionModule],
})
export class AppModule {}
