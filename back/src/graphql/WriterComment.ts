import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { withFilter } from "graphql-subscriptions";
import { PubSubChannels } from "../pubsub";

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

export const WriterCommentQueries = extendType({
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

export const WriterCommentMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createOneWriterComment", {
      type: "WriterComment",
      args: {
        content: nonNull(stringArg()),
        writerIdBeingCommented: nonNull(intArg()),
        note: intArg(),
      },
      resolve: async (r, a, c, i) => {
        const { content, note, writerIdBeingCommented } = a;

        const { writerId } = c;

        if (!writerId) {
          throw new Error("Cannot post one comment without logging in");
        }

        const comment = await c.prisma.writerComment.create({
          data: {
            isValidated: false,
            content,
            note,
            writtenBy: { connect: { id: writerId } },
            writtenOn: { connect: { id: writerIdBeingCommented } },
          },
        });

        c.pubSub.publish("newWriterComment", {
          createdWriterComment: comment,
        });

        return comment;
      },
    });

    t.nonNull.field("updateOneWriterComment", {
      type: "WriterComment",
      args: {
        commentId: nonNull(intArg()),
        content: nonNull(stringArg()),
        note: intArg(),
      },
      resolve: async (r, a, c, i) => {
        const { content, note, commentId } = a;
        const { writerId } = c;

        if (!writerId) {
          throw new Error("Cannot update comment without logging in");
        }

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
        const { writerId } = c;

        if (!writerId) {
          throw new Error("Cannot delete comment without logging in");
        }

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
        const { writerId } = c;

        if (!writerId) {
          throw new Error("Cannot validate comment without logging in");
        }

        const comment = await c.prisma.writerComment.update({
          data: { isValidated: true },
          where: { id: commentId },
        });

        return comment;
      },
    });
  },
});

export const WriterCommentSubscriptions = extendType({
  type: "Subscription",
  definition(t) {
    t.field("newWriterComment", {
      type: "WriterComment",
      subscribe: withFilter(
        (r, a, c, i) => {
          return c.pubSub.asyncIterator("newWriterComment");
        },
        async (p, v, c, i) => {
          return p.createdWriterComment.writtenOnId === c.writerId;
        }
      ),
      resolve: (payload: PubSubChannels["newWriterComment"][0]) => {
        return payload.createdWriterComment;
      },
    });
  },
});
