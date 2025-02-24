import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoHabitacionDto } from './create-tipo_habitacion.dto';

export class UpdateTipoHabitacionDto extends PartialType(CreateTipoHabitacionDto) {}
