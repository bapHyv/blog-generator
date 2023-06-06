import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const allArticles = await prisma.article.findMany();
  console.log(allArticles);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
