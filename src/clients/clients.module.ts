import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { LibModule } from 'src/lib/lib.module';
import { PrismaModule } from 'src/config/prisma/prisma.module';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [LibModule,PrismaModule],
})
export class ClientsModule {}
