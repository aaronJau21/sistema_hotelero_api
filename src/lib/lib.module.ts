import { Module } from '@nestjs/common';
import { HashService } from './hash/hash.service';
import { TokenService } from './token/token.service';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config/envs';

@Module({
  providers: [HashService, TokenService],
  exports: [HashService, TokenService],
  imports: [
    JwtModule.register({
      global: true,
      secret: envs.secretKey,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class LibModule {}
