-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WriterComment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isValidated" BOOLEAN NOT NULL,
    "content" TEXT NOT NULL,
    "note" INTEGER,
    "writtenById" INTEGER NOT NULL,
    "writtenOnId" INTEGER NOT NULL,
    CONSTRAINT "WriterComment_writtenById_fkey" FOREIGN KEY ("writtenById") REFERENCES "Writer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WriterComment_writtenOnId_fkey" FOREIGN KEY ("writtenOnId") REFERENCES "Writer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WriterComment" ("content", "createdAt", "id", "isValidated", "note", "writtenById", "writtenOnId") SELECT "content", "createdAt", "id", "isValidated", "note", "writtenById", "writtenOnId" FROM "WriterComment";
DROP TABLE "WriterComment";
ALTER TABLE "new_WriterComment" RENAME TO "WriterComment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
