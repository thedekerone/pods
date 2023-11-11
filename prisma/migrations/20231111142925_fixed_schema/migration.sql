/*
  Warnings:

  - You are about to drop the column `sources` on the `Widget` table. All the data in the column will be lost.
  - Added the required column `widgetId` to the `Sources` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sources" ADD COLUMN     "widgetId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Widget" DROP COLUMN "sources";

-- AddForeignKey
ALTER TABLE "Sources" ADD CONSTRAINT "Sources_widgetId_fkey" FOREIGN KEY ("widgetId") REFERENCES "Widget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
