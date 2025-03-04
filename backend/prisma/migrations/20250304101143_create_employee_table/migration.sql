/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `_id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "_id",
ADD COLUMN     "_id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("_id");

-- CreateTable
CREATE TABLE "employees" (
    "_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "salary" TEXT NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("_id")
);
