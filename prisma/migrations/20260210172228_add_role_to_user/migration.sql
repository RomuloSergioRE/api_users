-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADM', 'CLIENT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CLIENT';
