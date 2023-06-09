-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ArticleComment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isValidated" BOOLEAN NOT NULL,
    "content" TEXT NOT NULL,
    "note" INTEGER,
    "writerId" INTEGER NOT NULL,
    "articleId" INTEGER NOT NULL,
    CONSTRAINT "ArticleComment_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES "Writer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ArticleComment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ArticleComment" ("articleId", "content", "createdAt", "id", "isValidated", "note", "writerId") SELECT "articleId", "content", "createdAt", "id", "isValidated", "note", "writerId" FROM "ArticleComment";
DROP TABLE "ArticleComment";
ALTER TABLE "new_ArticleComment" RENAME TO "ArticleComment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
