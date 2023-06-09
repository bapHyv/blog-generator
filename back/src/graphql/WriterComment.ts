import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";

export const WriterComment = objectType({
  name: "WriterComment",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.dateTime("createdAt");
    t.nonNull.boolean("isValidated");
    t.nonNull.string("content");
    t.int("note");

    t.field("writtenBy", {
      type: "Writer",
      resolve: (r, a, c, i) =>
        c.prisma.writerComment.findUnique({ where: { id: r.id } }).writtenBy(),
    });

    t.field("writtenOn", {
      type: "Writer",
      resolve: (r, a, c, i) =>
        c.prisma.writerComment.findUnique({ where: { id: r.id } }).writtenOn(),
    });
  },
});

export const ArticleCommentQueries = extendType({
  type: "Query",
  definition(t) {
    t.field("getOneWritterComment", {
      type: "WriterComment",
      args: {
        commentId: nonNull(intArg()),
      },
      resolve: async (r, a, c, i) => {
        const { commentId } = a;

        const comment = await c.prisma.writerComment.findUnique({
          where: { id: commentId },
        });

        return comment;
      },
    });

    t.nonNull.list.nonNull.field("getAllWriterComments", {
      type: "WriterComment",
      resolve: async (r, a, c, i) => {
        const comments = await c.prisma.writerComment.findMany();

        return comments;
      },
    });
  },
});

export const ArticleCommentMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createOneWriterComment", {
      type: "WriterComment",
      args: {
        content: nonNull(stringArg()),
        writerIdHasCommented: nonNull(intArg()),
        writerIdBeingCommented: nonNull(intArg()),
        note: intArg(),
      },
      resolve: async (r, a, c, i) => {
        const { content, note, writerIdHasCommented, writerIdBeingCommented } =
          a;

        const comment = await c.prisma.writerComment.create({
          data: {
            isValidated: false,
            content,
            note,
            writtenBy: { connect: { id: writerIdHasCommented } },
            writtenOn: { connect: { id: writerIdBeingCommented } },
          },
        });

        return comment;
      },
    });

    t.nonNull.field("updateOneWriterComment", {
      type: "WriterComment",
      args: {
        commentId: nonNull(intArg()),
        content: nonNull(stringArg()),
        writerIdHasCommented: nonNull(intArg()),
        writerIdBeingCommented: nonNull(intArg()),
        note: intArg(),
      },
      resolve: async (r, a, c, i) => {
        const { content, note, commentId } = a;

        const comment = await c.prisma.writerComment.update({
          data: {
            content,
            note,
          },
          where: {
            id: commentId,
          },
        });

        return comment;
      },
    });

    t.nonNull.field("deleteOneArticleComment", {
      type: "WriterComment",
      args: {
        commentId: nonNull(intArg()),
      },
      resolve: async (r, a, c, i) => {
        const { commentId } = a;

        const comment = await c.prisma.writerComment.delete({
          where: { id: commentId },
        });

        return comment;
      },
    });

    t.nonNull.field("validateOneComment", {
      type: "WriterComment",
      args: {
        commentId: nonNull(intArg()),
      },
      resolve: async (r, a, c, i) => {
        const { commentId } = a;

        const comment = await c.prisma.writerComment.update({
          data: { isValidated: true },
          where: { id: commentId },
        });

        return comment;
      },
    });
  },
});
