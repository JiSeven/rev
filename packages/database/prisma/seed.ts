import { prisma } from "../src/index";

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        name: "Veloria Midnight",
        brand: "Veloria",
        type: "CANDLE",
        price: 85,
        description:
          "A luxurious scented candle that evokes the mystery of a starlit night.",
        scentProfile: {
          top: ["Bergamot", "Black Pepper"],
          heart: ["Rose", "Cedarwood"],
          base: ["Sandalwood", "Amber", "Musk"],
        },
      },
      {
        name: "Ethereal Mist",
        brand: "Veloria",
        type: "PERFUME",
        price: 120,
        description:
          "A light, airy fragrance designed for those who appreciate subtle elegance.",
        scentProfile: {
          top: ["Lemon", "Mint"],
          heart: ["Jasmin", "Green Tea"],
          base: ["White Musk"],
        },
      },
    ],
  });

  console.log("✅ Seed data inserted successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
