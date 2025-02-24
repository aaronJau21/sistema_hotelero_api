import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTipoHabitacionDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  capacidad: number;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  precioBase: number;

  @IsBoolean()
  @IsOptional()
  status: boolean;
}
