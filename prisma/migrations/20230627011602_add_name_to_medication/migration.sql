/*
  Warnings:

  - Added the required column `name` to the `medications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "medications" ADD COLUMN     "name" TEXT NOT NULL;
