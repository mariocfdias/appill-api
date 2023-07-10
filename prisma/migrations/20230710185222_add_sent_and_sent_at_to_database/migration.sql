/*
  Warnings:

  - Added the required column `sentAt` to the `doses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "doses" ADD COLUMN     "sent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sentAt" TIMESTAMP(3) NOT NULL;
