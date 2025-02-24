import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function role() {
  await prisma.roles.createMany({
    data: [
      {
        name: 'admin',
      },
      {
        name: 'user',
      },
    ],
  });
}

async function user() {
  const password = '123456789';
  const hash = await bcrypt.hash(password, 10);
  await prisma.users.createMany({
    data: [
      {
        nombre: 'Aaron',
        apellido_paterno: 'Jauregui',
        apellido_materno: 'Sifuentes',
        user_name: 'admin',
        password: hash,
        role_id: 1,
      },
      {
        nombre: 'Pedro',
        apellido_paterno: 'Jauregui',
        apellido_materno: 'Sifuentes',
        user_name: 'user',
        password: hash,
        role_id: 2,
      },
    ],
  });
}

async function estado_habitacion() {
  await prisma.estado_habitacion.createMany({
    data: [
      {
        nombre: 'Disponible',
      },
      {
        nombre: 'Ocupado',
      },
      {
        nombre: 'Mantenimiento',
      },
    ],
  });
}

async function estado_reservas() {
  await prisma.estado_reservas.createMany({
    data: [
      {
        nombre: 'Pendiente',
      },
      {
        nombre: 'Confirmada',
      },
      {
        nombre: 'Cancelada',
      },
    ],
  });
}

async function main() {
  try {
    await role();
    await user();
    await estado_habitacion();
    await estado_reservas();
    console.log('Datos insertados con éxito');
  } catch (e) {
    console.error('Error al insertar datos:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
