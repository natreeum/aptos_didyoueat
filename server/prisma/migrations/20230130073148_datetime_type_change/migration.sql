/*
  Warnings:

  - The primary key for the `Collection` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_collection_id_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_collection_id_fkey";

-- AlterTable
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_pkey",
ALTER COLUMN "collection_id" DROP DEFAULT,
ALTER COLUMN "collection_id" SET DATA TYPE TEXT,
ALTER COLUMN "created_at" DROP DEFAULT,
ALTER COLUMN "created_at" SET DATA TYPE TEXT,
ADD CONSTRAINT "Collection_pkey" PRIMARY KEY ("collection_id");
DROP SEQUENCE "Collection_collection_id_seq";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "collection_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Token" ALTER COLUMN "created_at" DROP DEFAULT,
ALTER COLUMN "created_at" SET DATA TYPE TEXT,
ALTER COLUMN "collection_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "Collection"("collection_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "Collection"("collection_id") ON DELETE RESTRICT ON UPDATE CASCADE;
