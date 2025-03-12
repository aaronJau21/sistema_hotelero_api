export interface IGetHabitaciones {
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
  deleted_at: null;
  Categoria_habitaciones: CategoriaHabitaciones;
  Estado_habitacion: EstadoHabitacion;
}

export interface CategoriaHabitaciones {
  id: number;
  nombre: string;
  descripcion: null;
  capacidad: number;
  precioBase: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface EstadoHabitacion {
  id: number;
  nombre: string;
}
