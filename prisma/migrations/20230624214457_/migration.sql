-- CreateTable
CREATE TABLE "dose" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "time" DATETIME NOT NULL,
    "medicationId" TEXT NOT NULL,
    CONSTRAINT "dose_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "medications" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "medications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "unitType" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "until" DATETIME NOT NULL,
    "stock" INTEGER NOT NULL,
    "observation" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
