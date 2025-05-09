/*
  Warnings:

  - You are about to drop the column `author` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Post` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "author",
DROP COLUMN "updatedAt",
ADD COLUMN     "authorId" TEXT NOT NULL,
ALTER COLUMN "type" DROP DEFAULT;
