-- CreateEnum
CREATE TYPE "PartCategory" AS ENUM ('ENGINE', 'BRAKES', 'SUSPENSION', 'EXHAUST', 'ELECTRICAL', 'BODY', 'DRIVETRAIN', 'TYRES', 'ACCESSORIES');

-- CreateTable
CREATE TABLE "Motorcycle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "priceAmount" DOUBLE PRECISION NOT NULL,
    "priceCurrency" CHAR(3) NOT NULL,
    "engineSpec" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Motorcycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Part" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "priceAmount" DOUBLE PRECISION NOT NULL,
    "priceCurrency" CHAR(3) NOT NULL,
    "partCategory" "PartCategory" NOT NULL,
    "compatibilities" JSONB NOT NULL,
    "oemPartNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Part_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Motorcycle_make_idx" ON "Motorcycle"("make");

-- CreateIndex
CREATE INDEX "Motorcycle_createdAt_idx" ON "Motorcycle"("createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "Motorcycle_make_model_year_key" ON "Motorcycle"("make", "model", "year");

-- CreateIndex
CREATE INDEX "Part_partCategory_idx" ON "Part"("partCategory");

-- CreateIndex
CREATE INDEX "Part_createdAt_idx" ON "Part"("createdAt" DESC);

-- CreateIndex
CREATE INDEX Part_compatibilities_gin ON "Part" USING GIN ("compatibilities");