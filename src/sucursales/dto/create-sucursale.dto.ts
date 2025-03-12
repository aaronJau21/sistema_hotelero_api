import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateSucursaleDto {
  @IsString()
  nombre: string;

  @IsString()
  direccion: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;
}
