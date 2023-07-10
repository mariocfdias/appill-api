-- CreateTable
CREATE TABLE "directives" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "medicationId" TEXT NOT NULL,

    CONSTRAINT "directives_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "directives" ADD CONSTRAINT "directives_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "medications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
