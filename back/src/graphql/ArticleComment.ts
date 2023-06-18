import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";
import { PubSubChannels } from "../pubsub";
import { withFilter } from "graphql-subscriptions";

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

    t.nonNull.list.nonNull.field("getAllComments", {
      type: "ArticleComment",
      resolve: async (r, a, c, i) => {
        const comments = await c.prisma.articleComment.findMany();

        return comments;
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
        articleId: nonNull(intArg()),
        note: intArg(),
      },
      resolve: async (r, a, c, i) => {
        const { content, note, articleId } = a;
        const { writerId } = c;

        if (!writerId) {
          throw new Error("Cannot comment without logging in");
        }

        const comment = await c.prisma.articleComment.create({
          data: {
            isValidated: false,
            content,
            note,
            publishedBy: { connect: { id: writerId } },
            publishedOn: { connect: { id: articleId } },
          },
        });

        c.pubSub.publish("newArticleComment", {
          createdArticleComment: comment,
        });

        return comment;
      },
    });

    t.nonNull.field("updateOneArticleComment", {
      type: "ArticleComment",
      args: {
        commentId: nonNull(intArg()),
        content: nonNull(stringArg()),
        note: intArg(),
      },
      resolve: async (r, a, c, i) => {
        const { commentId, content, note } = a;
        const { writerId } = c;

        if (!writerId) {
          throw new Error("Cannot update the comment without logging in");
        }

        const comment = await c.prisma.articleComment.update({
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
      type: "ArticleComment",
      args: {
        commentId: nonNull(intArg()),
      },
      resolve: async (r, a, c, i) => {
        const { commentId } = a;
        const { writerId } = c;

        if (!writerId) {
          throw new Error("Cannot delete the comment without logging in");
        }

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
        const { writerId } = c;

        if (!writerId) {
          throw new Error("Cannot validate without logging in");
        }

        const comment = await c.prisma.articleComment.update({
          data: { isValidated: true },
          where: { id: commentId },
        });

        return comment;
      },
    });
  },
});

export const ArticleCommentSubscriptions = extendType({
  type: "Subscription",
  definition(t) {
    t.field("newArticleComment", {
      type: "ArticleComment",
      subscribe: withFilter(
        (r, a, c, i) => {
          return c.pubSub.asyncIterator("newArticleComment");
        },
        async (p, v, c, i) => {
          const article = await c.prisma.article.findUnique({
            where: { id: p.createdArticleComment.articleId },
          });

          return c.writerId === article.writerId;
        }
      ),
      resolve: (payload: PubSubChannels["newArticleComment"][0]) => {
        return payload.createdArticleComment;
      },
    });
  },
});
