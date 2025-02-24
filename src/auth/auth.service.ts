import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { HashService } from 'src/lib/hash/hash.service';
import { TokenService } from 'src/lib/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hash: HashService,
    private readonly token: TokenService,
  ) {}

  async login(data: AuthLoginDto) {
    const user = await this.prisma.users.findFirst({
      where: {
        user_name: data.user_name,
      },
    });

    if (!user) {
      throw new NotFoundException('Credenciales incorrectas');
    }

    const compare = await this.hash.comparePassword(
      data.password,
      user.password,
    );

    if (!compare) {
      throw new NotFoundException('Credenciales incorrectas');
    }

    const { password, id, ...rest } = user;
    const createToken = await this.token.createToken({
      nombre: user.nombre,
      apellido_materno: user.apellido_materno,
      apellido_paterno: user.apellido_paterno,
      user_name: user.user_name,
    });

    return { user: rest, token: createToken };
  }
}
