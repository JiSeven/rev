import { PrismaPg } from "@prisma/adapter-pg";
import {
  type Prisma,
  PrismaClient,
  Product,
  ProductType,
} from "./generated/prisma/client.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
export const prisma = new PrismaClient({ adapter });

export { PrismaClientKnownRequestError, ProductType };
export type { Product, PrismaClient, Prisma };
