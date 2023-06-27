-- DropForeignKey
ALTER TABLE "doses" DROP CONSTRAINT "doses_medicationId_fkey";

-- DropForeignKey
ALTER TABLE "medications" DROP CONSTRAINT "medications_pacientId_fkey";

-- AddForeignKey
ALTER TABLE "doses" ADD CONSTRAINT "doses_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "medications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medications" ADD CONSTRAINT "medications_pacientId_fkey" FOREIGN KEY ("pacientId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
