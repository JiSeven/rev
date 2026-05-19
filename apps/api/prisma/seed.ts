import { PrismaPg } from '@prisma/adapter-pg';

import { env } from '../src/config/env';
import { PrismaClient } from '../src/prisma/generated/client';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: env.DATABASE_URL,
  }),
});

async function main() {
  console.log('🚀 Starting seed process...');

  try {
    const sedan = await prisma.bodyType.upsert({
      where: { name: 'Sedan' },
      update: {},
      create: { name: 'Sedan' },
    });
    const suv = await prisma.bodyType.upsert({
      where: { name: 'SUV' },
      update: {},
      create: { name: 'SUV' },
    });
    await prisma.bodyType.upsert({
      where: { name: 'Coupe' },
      update: {},
      create: { name: 'Coupe' },
    });

    const gasoline = await prisma.fuelType.upsert({
      where: { name: 'Gasoline' },
      update: {},
      create: { name: 'Gasoline' },
    });

    const diesel = await prisma.fuelType.upsert({
      where: { name: 'Diesel' },
      update: {},
      create: { name: 'Diesel' },
    });

    await prisma.fuelType.upsert({
      where: { name: 'Electric' },
      update: {},
      create: { name: 'Electric' },
    });

    const automatic = await prisma.transmissionType.upsert({
      where: { name: 'Automatic' },
      update: {},
      create: { name: 'Automatic' },
    });

    const manual = await prisma.transmissionType.upsert({
      where: { name: 'Manual' },
      update: {},
      create: { name: 'Manual' },
    });

    const vehiclesData = [
      {
        vin: '1HGCM2T34A',
        plateNumber: 'SM1',
        year: 2020,
        latitude: 40.7,
        longitude: -73.9,
        bodyTypeId: sedan.id,
        fuelTypeId: gasoline.id,
        transmissionTypeId: automatic.id,
      },
      {
        vin: '1HGM3T52B',
        plateNumber: 'SM2',
        year: 2018,
        latitude: 40.7,
        longitude: -73.9,
        bodyTypeId: suv.id,
        fuelTypeId: diesel.id,
        transmissionTypeId: manual.id,
      },
    ];

    for (const vehicle of vehiclesData) {
      await prisma.vehicle.upsert({
        where: { vin: vehicle.vin },
        update: vehicle,
        create: vehicle,
      });
    }

    console.log('\n✨ Seeding completed successfully!');
  } catch (error) {
    console.error('\n🚨 Failed to seed the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
