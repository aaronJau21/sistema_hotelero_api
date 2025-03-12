export interface ICreateHabitacion {
  id: number;
  numero_habitacion: string;
  id_categoria: number;
  id_estado_habitacion: number;
  status: boolean;
  id_user: number;
  descripcion: null | string;
  servicios_incluidos: null | string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null | Date;
}
