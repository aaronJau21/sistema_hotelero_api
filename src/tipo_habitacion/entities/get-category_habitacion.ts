import { Decimal } from '@prisma/client/runtime/library';

export interface IGetCategoryHabitacion {
  id: number;
  nombre: string;
  descripcion: string | null;
  capacidad: number;
  precioBase: Decimal;
  status: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
