/*
  Warnings:

  - You are about to drop the column `BlogLabel` on the `Writer` table. All the data in the column will be lost.
  - You are about to drop the column `publishedAt` on the `Article` table. All the data in the column will be lost.
  - Added the required column `blogLabel` to the `Writer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Writer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `writerId` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `articleId` to the `ArticleComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `writerId` to the `ArticleComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `writtenById` to the `WriterComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `writtenOnId` to the `WriterComment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Follow" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "followingId" INTEGER NOT NULL,
    "followedId" INTEGER NOT NULL,
    CONSTRAINT "Follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "Writer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Follow_followedId_fkey" FOREIGN KEY ("followedId") REFERENCES "Writer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ArticleToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ArticleToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Article" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ArticleToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

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
    "blogLabel" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Writer_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Writer" ("avatar", "createdAt", "description", "email", "id", "password", "pseudo", "role") SELECT "avatar", "createdAt", "description", "email", "id", "password", "pseudo", "role" FROM "Writer";
DROP TABLE "Writer";
ALTER TABLE "new_Writer" RENAME TO "Writer";
CREATE UNIQUE INDEX "Writer_email_key" ON "Writer"("email");
CREATE TABLE "new_Article" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "content" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL,
    "writerId" INTEGER NOT NULL,
    CONSTRAINT "Article_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES "Writer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Article" ("content", "createdAt", "id", "isPublished", "label", "updatedAt") SELECT "content", "createdAt", "id", "isPublished", "label", "updatedAt" FROM "Article";
DROP TABLE "Article";
ALTER TABLE "new_Article" RENAME TO "Article";
CREATE TABLE "new_ArticleComment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isValidated" BOOLEAN NOT NULL,
    "content" TEXT NOT NULL,
    "note" INTEGER NOT NULL,
    "writerId" INTEGER NOT NULL,
    "articleId" INTEGER NOT NULL,
    CONSTRAINT "ArticleComment_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES "Writer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ArticleComment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ArticleComment" ("content", "createdAt", "id", "isValidated", "note") SELECT "content", "createdAt", "id", "isValidated", "note" FROM "ArticleComment";
DROP TABLE "ArticleComment";
ALTER TABLE "new_ArticleComment" RENAME TO "ArticleComment";
CREATE TABLE "new_Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    CONSTRAINT "Image_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Writer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Image" ("createdAt", "id", "url") SELECT "createdAt", "id", "url" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
CREATE TABLE "new_WriterComment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isValidated" BOOLEAN NOT NULL,
    "content" TEXT NOT NULL,
    "note" INTEGER NOT NULL,
    "writtenById" INTEGER NOT NULL,
    "writtenOnId" INTEGER NOT NULL,
    CONSTRAINT "WriterComment_writtenById_fkey" FOREIGN KEY ("writtenById") REFERENCES "Writer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WriterComment_writtenOnId_fkey" FOREIGN KEY ("writtenOnId") REFERENCES "Writer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WriterComment" ("content", "createdAt", "id", "isValidated", "note") SELECT "content", "createdAt", "id", "isValidated", "note" FROM "WriterComment";
DROP TABLE "WriterComment";
ALTER TABLE "new_WriterComment" RENAME TO "WriterComment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToTag_AB_unique" ON "_ArticleToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToTag_B_index" ON "_ArticleToTag"("B");
