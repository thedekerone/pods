/*
  Warnings:

  - The values [PIE,DONUT,AREA,SCATTER] on the enum `ChartType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `data` on the `Widget` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ChartType_new" AS ENUM ('BAR', 'LINE', 'NEWS', 'SINGLE_VALUE');
ALTER TABLE "Widget" ALTER COLUMN "chartType" TYPE "ChartType_new" USING ("chartType"::text::"ChartType_new");
ALTER TYPE "ChartType" RENAME TO "ChartType_old";
ALTER TYPE "ChartType_new" RENAME TO "ChartType";
DROP TYPE "ChartType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Widget" DROP COLUMN "data";

-- CreateTable
CREATE TABLE "WidgetData" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "widgetId" TEXT NOT NULL,

    CONSTRAINT "WidgetData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WidgetData" ADD CONSTRAINT "WidgetData_widgetId_fkey" FOREIGN KEY ("widgetId") REFERENCES "Widget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
