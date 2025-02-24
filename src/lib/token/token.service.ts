import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface IPayload {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  user_name: string;
}

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(payload: IPayload): Promise<string> {
    return await this.jwtService.sign(payload);
  }
}
