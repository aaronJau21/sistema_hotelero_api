import { Module } from '@nestjs/common';
import { LibModule } from './lib/lib.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './config/prisma/prisma.module';
import { TipoHabitacionModule } from './tipo_habitacion/tipo_habitacion.module';
import { HabitacionesModule } from './habitaciones/habitaciones.module';
import { EstadosModule } from './estados/estados.module';
import { SucursalesModule } from './sucursales/sucursales.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    LibModule,
    AuthModule,
    PrismaModule,
    TipoHabitacionModule,
    HabitacionesModule,
    EstadosModule,
    SucursalesModule,
    ClientsModule,
  ],
})
export class AppModule {}
