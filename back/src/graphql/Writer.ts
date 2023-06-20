import { Category } from "@prisma/client";
import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";

export const Writer = objectType({
  name: "Writer",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("role");
    t.nonNull.string("pseudo");
    t.nonNull.string("email");
    t.nonNull.string("password");
    t.nonNull.string("description");
    t.nonNull.string("avatar");
    t.nonNull.dateTime("createdAt");
    t.nonNull.string("blogLabel");

    t.field("category", {
      type: "Category",
      resolve: (r, a, c) =>
        c.prisma.writer.findUnique({ where: { id: r.id } }).category(),
    });

    t.list.field("articles", {
      type: "Article",
      resolve: (r, a, c) =>
        c.prisma.writer.findUnique({ where: { id: r.id } }).articles(),
    });

    t.list.field("images", {
      type: "Image",
      resolve: (r, a, c) =>
        c.prisma.writer.findUnique({ where: { id: r.id } }).images(),
    });

    t.list.field("commentsOnArticles", {
      type: "ArticleComment",
      resolve: (r, a, c) =>
        c.prisma.writer
          .findUnique({ where: { id: r.id } })
          .commentsOnArticles(),
    });

    t.list.field("commentsOnWriters", {
      type: "ArticleComment",
      resolve: (r, a, c) =>
        c.prisma.writer.findUnique({ where: { id: r.id } }).commentsOnWriters(),
    });

    t.list.field("commentsFromWriters", {
      type: "ArticleComment",
      resolve: (r, a, c) =>
        c.prisma.writer
          .findUnique({ where: { id: r.id } })
          .commentsFromWriters(),
    });

    t.list.field("following", {
      type: "Follow",
      resolve: (r, a, c) =>
        c.prisma.writer.findUnique({ where: { id: r.id } }).followers(),
    });

    t.list.field("followers", {
      type: "Follow",
      resolve: (r, a, c) =>
        c.prisma.writer.findUnique({ where: { id: r.id } }).following(),
    });
  },
});

export const WriterQueries = extendType({
  type: "Query",
  definition(t) {
    t.field("getOneWriter", {
      type: "Writer",
      args: {
        writerId: nonNull(intArg()),
      },
      resolve: async (r, a, c, i) => {
        const { writerId } = a;

        const writer = await c.prisma.writer.findUnique({
          where: { id: writerId },
        });

        return writer;
      },
    });

    t.nonNull.list.nonNull.field("getAllWriters", {
      type: "Writer",
      args: {
        filter: stringArg(),
        skip: intArg(),
        take: intArg(),
      },
      resolve: async (r, a, c, i) => {
        const { filter, skip, take } = a;

        if (filter) {
          const where = {
            where: {
              OR: [{ pseudo: { contains: filter } }],
            },
            skip: skip as number | undefined,
            take: take as number | undefined,
          };

          return c.prisma.writer.findMany(where);
        }

        const writers = await c.prisma.writer.findMany({
          skip: skip as number | undefined,
          take: take as number | undefined,
        });
        return writers;
      },
    });
  },
});

export const WriterMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateWriter", {
      type: "Writer",
      args: {
        pseudo: nonNull(stringArg()),
        description: nonNull(stringArg()),
        avatar: nonNull(stringArg()),
        blogLabel: nonNull(stringArg()),
        categoryId: nonNull(intArg()),
      },
      resolve: async (r, a, c, i) => {
        const { avatar, blogLabel, description, pseudo, categoryId } = a;
        const { writerId } = c;

        if (!writerId) {
          throw new Error("Cannot update data without logging in");
        }

        const now = new Date();

        const writer = await c.prisma.writer.update({
          data: {
            avatar,
            blogLabel,
            description,
            pseudo,
            createdAt: now,
            category: { connect: { id: categoryId } },
          },
          where: { id: writerId },
        });

        return writer;
      },
    });
  },
});
