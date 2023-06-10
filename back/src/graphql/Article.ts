import {
  objectType,
  extendType,
  nonNull,
  stringArg,
  booleanArg,
  intArg,
} from "nexus";

export const Article = objectType({
  name: "Article",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("label");
    t.nonNull.dateTime("createdAt");
    t.nonNull.dateTime("updatedAt");
    t.nonNull.string("content");
    t.nonNull.boolean("isPublished");

    t.field("publishedBy", {
      type: "Writer",
      resolve: (r, a, c, i) =>
        c.prisma.article.findUnique({ where: { id: r.id } }).publishedBy(),
    });

    t.list.nonNull.field("comments", {
      type: "ArticleComment",
      resolve: (r, a, c) =>
        c.prisma.article.findUnique({ where: { id: r.id } }).comments(),
    });
  },
});

export const ArticleQueries = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("getAllArticles", {
      type: "Article",
      resolve(r, a, c, i) {
        return c.prisma.article.findMany();
      },
    });
    t.field("getOneArticle", {
      type: "Article",
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (r, a, c, i) => {
        const { id } = a;

        const article = await c.prisma.article.findUnique({ where: { id } });

        return article;
      },
    });
  },
});

export const ArticleMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createOneArticle", {
      type: "Article",
      args: {
        label: nonNull(stringArg()),
        content: nonNull(stringArg()),
        isPublished: nonNull(booleanArg()),
      },
      resolve: async (r, a, c, i) => {
        const { label, content, isPublished } = a;
        const { writerId } = c;

        if (!writerId) {
          throw new Error("Cannot post without logging in");
        }

        const now = new Date();

        const newArticle = c.prisma.article.create({
          data: {
            label,
            createdAt: now,
            updatedAt: now,
            content,
            isPublished,
            publishedBy: { connect: { id: writerId } },
          },
        });

        return newArticle;
      },
    });

    t.nonNull.field("deleteOneArticle", {
      type: "Article",
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (r, a, c, i) => {
        const { id } = a;
        const { writerId } = c;

        if (!writerId) {
          throw new Error("Cannot post without logging in");
        }

        const article = c.prisma.article.delete({ where: { id } });

        return article;
      },
    });

    t.nonNull.field("updateOneArticle", {
      type: "Article",
      args: {
        id: nonNull(intArg()),
        label: nonNull(stringArg()),
        content: nonNull(stringArg()),
        isPublished: nonNull(booleanArg()),
        // tag: nonNull(stringArg()),
      },
      resolve: (r, a, c, i) => {
        const { content, id, isPublished, label } = a;
        const { writerId } = c;

        if (!writerId) {
          throw new Error("Cannot post without logging in");
        }

        const article = c.prisma.article.update({
          data: { content, id, isPublished, label },
          where: { id },
        });

        return article;
      },
    });

    t.nonNull.field("changeArticleVisibility", {
      type: "Article",
      args: {
        id: nonNull(intArg()),
        isPublished: nonNull(booleanArg()),
      },
      resolve: (r, a, c, i) => {
        const { id, isPublished } = a;
        const { writerId } = c;

        if (!writerId) {
          throw new Error("Cannot post without logging in");
        }

        const article = c.prisma.article.update({
          data: { id, isPublished },
          where: { id },
        });

        return article;
      },
    });
  },
});
