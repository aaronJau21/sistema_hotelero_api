import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido_paterno: string;

  @IsString()
  apellido_materno: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  edad: number;

  @IsBoolean()
  @IsOptional()
  status: boolean;
}
