import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateDepartamentoDto {
  @IsString()
  nombre: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;
}
