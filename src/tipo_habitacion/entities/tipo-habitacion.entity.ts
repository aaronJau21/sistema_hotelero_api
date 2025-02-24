import { Decimal } from '@prisma/client/runtime/library';

export interface TipoHabitacionEntity {
  categoria_habitacion: CategoriaHabitacion;
}

export interface CategoriaHabitacion {
  id: number;
  nombre: string;
  descripcion: null | string;
  capacidad: number;
  precioBase: Decimal;
  status: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: null | Date;
}
