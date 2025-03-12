import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHabitacioneDto {
  @IsString()
  numero_habitacion: string;

  @IsNumber()
  id_categoria: number;

  @IsNumber()
  id_estado_habitacion: number;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsString()
  @IsOptional()
  servicios_incluidos: string;

  @IsNumber()
  id_sucursal: number;
}
