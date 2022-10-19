/*
  Warnings:

  - Added the required column `pin_code` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "pin_code" VARCHAR(6) NOT NULL;
