-- DropForeignKey
ALTER TABLE "medications" DROP CONSTRAINT "medications_pacientId_fkey";

-- AddForeignKey
ALTER TABLE "medications" ADD CONSTRAINT "medications_pacientId_fkey" FOREIGN KEY ("pacientId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
