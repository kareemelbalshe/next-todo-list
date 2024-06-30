/*
  Warnings:

  - The values [COMPLETE] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `title` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(200)`.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('TODO', 'IN_PROGRESS', 'COMPLETED');
ALTER TABLE "Task" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Task" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Task" ALTER COLUMN "status" SET DEFAULT 'TODO';
COMMIT;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "title" SET DATA TYPE VARCHAR(200);
