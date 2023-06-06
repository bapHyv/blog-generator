-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Writer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "BlogLabel" TEXT NOT NULL
);
INSERT INTO "new_Writer" ("BlogLabel", "avatar", "createdAt", "description", "email", "id", "password", "pseudo", "role") SELECT "BlogLabel", "avatar", "createdAt", "description", "email", "id", "password", "pseudo", "role" FROM "Writer";
DROP TABLE "Writer";
ALTER TABLE "new_Writer" RENAME TO "Writer";
CREATE UNIQUE INDEX "Writer_email_key" ON "Writer"("email");
CREATE TABLE "new_ArticleComment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isValidated" BOOLEAN NOT NULL,
    "content" TEXT NOT NULL,
    "note" INTEGER NOT NULL
);
INSERT INTO "new_ArticleComment" ("content", "createdAt", "id", "isValidated", "note") SELECT "content", "createdAt", "id", "isValidated", "note" FROM "ArticleComment";
DROP TABLE "ArticleComment";
ALTER TABLE "new_ArticleComment" RENAME TO "ArticleComment";
CREATE TABLE "new_WriterComment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isValidated" BOOLEAN NOT NULL,
    "content" TEXT NOT NULL,
    "note" INTEGER NOT NULL
);
INSERT INTO "new_WriterComment" ("content", "createdAt", "id", "isValidated", "note") SELECT "content", "createdAt", "id", "isValidated", "note" FROM "WriterComment";
DROP TABLE "WriterComment";
ALTER TABLE "new_WriterComment" RENAME TO "WriterComment";
CREATE TABLE "new_Article" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "publishedAt" DATETIME NOT NULL,
    "content" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL
);
INSERT INTO "new_Article" ("content", "createdAt", "id", "isPublished", "label", "publishedAt", "updatedAt") SELECT "content", "createdAt", "id", "isPublished", "label", "publishedAt", "updatedAt" FROM "Article";
DROP TABLE "Article";
ALTER TABLE "new_Article" RENAME TO "Article";
CREATE TABLE "new_Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL
);
INSERT INTO "new_Image" ("createdAt", "id", "url") SELECT "createdAt", "id", "url" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
