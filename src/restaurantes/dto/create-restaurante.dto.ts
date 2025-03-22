import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRestauranteDto {

  @IsString()
  nombre:string

  @IsString()
  direccion:string

  @IsString()
  imagen:string

  @IsString()
  @IsOptional()
  descripcion?:string

  @IsNumber()
  id_departamentos:number
}
