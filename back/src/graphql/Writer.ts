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
        c.prisma.writer.findUnique({ where: { id: r.id } }).following(),
    });

    t.list.field("followers", {
      type: "Follow",
      resolve: (r, a, c) =>
        c.prisma.writer.findUnique({ where: { id: r.id } }).followers(),
    });
  },
});

export const WriterMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("register", {
      type: "Writer",
      args: {
        role: nonNull(stringArg()),
        pseudo: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        description: nonNull(stringArg()),
        avatar: nonNull(stringArg()),
        blogLabel: nonNull(stringArg()),
        categoryId: nonNull(intArg()),
      },
      resolve: async (r, a, c, i) => {
        const {
          avatar,
          blogLabel,
          description,
          email,
          password,
          pseudo,
          role,
          categoryId,
        } = a;

        const now = new Date();

        const newWriter = await c.prisma.writer.create({
          data: {
            avatar,
            blogLabel,
            description,
            email,
            password,
            pseudo,
            role,
            createdAt: now,
            category: { connect: { id: categoryId } },
          },
        });

        return newWriter;
      },
    });
  },
});
