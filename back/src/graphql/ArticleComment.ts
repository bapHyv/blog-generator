import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";

export const ArticleComment = objectType({
  name: "ArticleComment",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.dateTime("createdAt");
    t.nonNull.boolean("isValidated");
    t.nonNull.string("content");
    t.int("note");

    t.field("publishedBy", {
      type: "Writer",
      resolve: (r, a, c, i) =>
        c.prisma.articleComment
          .findUnique({ where: { id: r.id } })
          .publishedBy(),
    });

    t.field("publishedOn", {
      type: "Article",
      resolve: (r, a, c) =>
        c.prisma.articleComment
          .findUnique({ where: { id: r.id } })
          .publishedOn(),
    });
  },
});

export const ArticleCommentQueries = extendType({
  type: "Query",
  definition(t) {
    t.field("getOneComment", {
      type: "ArticleComment",
      args: {
        commentId: nonNull(intArg()),
      },
      resolve: async (r, a, c, i) => {
        const { commentId } = a;

        const comment = await c.prisma.articleComment.findUnique({
          where: { id: commentId },
        });

        return comment;
      },
    });
  },
});

export const ArticleCommentMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createOneArticleComment", {
      type: "ArticleComment",
      args: {
        content: nonNull(stringArg()),
        writerId: nonNull(intArg()),
        articleId: nonNull(intArg()),
        note: intArg(),
      },
      resolve: async (r, a, c, i) => {
        const { content, note, articleId, writerId } = a;

        const comment = await c.prisma.articleComment.create({
          data: {
            isValidated: false,
            content,
            note,
            publishedBy: { connect: { id: writerId } },
            publishedOn: { connect: { id: articleId } },
          },
        });

        return comment;
      },
    });

    t.nonNull.field("updateOneArticleComment", {
      type: "ArticleComment",
      args: {
        commentId: nonNull(intArg()),
        content: nonNull(stringArg()),
        writerId: nonNull(intArg()),
        articleId: nonNull(intArg()),
        note: intArg(),
      },
      resolve: async (r, a, c, i) => {
        const { commentId, content, note, articleId, writerId } = a;

        const comment = await c.prisma.articleComment.update({
          data: {
            content,
            note,
            publishedBy: { connect: { id: writerId } },
            publishedOn: { connect: { id: articleId } },
          },
          where: {
            id: commentId,
          },
        });

        return comment;
      },
    });

    t.nonNull.field("deleteOneArticleComment", {
      type: "ArticleComment",
      args: {
        commentId: nonNull(intArg()),
      },
      resolve: async (r, a, c, i) => {
        const { commentId } = a;

        const comment = await c.prisma.articleComment.delete({
          where: { id: commentId },
        });

        return comment;
      },
    });

    t.nonNull.field("validateOneComment", {
      type: "ArticleComment",
      args: {
        commentId: nonNull(intArg()),
      },
      resolve: async (r, a, c, i) => {
        const { commentId } = a;

        const comment = await c.prisma.articleComment.update({
          data: { isValidated: true },
          where: { id: commentId },
        });

        return comment;
      },
    });
  },
});
