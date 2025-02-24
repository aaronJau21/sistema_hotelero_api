import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { LibModule } from 'src/lib/lib.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [PrismaModule, LibModule],
})
export class AuthModule {}
